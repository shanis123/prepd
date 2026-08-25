/* ═══════════════════════════════════════════════
   PREP D — catalogue, basket and the panels
   Everything here degrades to "nothing happens"
   rather than "half a checkout": the order form
   only ever composes a WhatsApp message, so there
   is no payment or account state to get wrong.
   ═══════════════════════════════════════════════ */

(function () {
    'use strict';

    var D = window.PREPD;
    if (!D) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ─────────── small helpers ─────────── */

    function $(sel, root) { return (root || document).querySelector(sel); }
    function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

    /* Product copy carries apostrophes and the odd ampersand, and it all
       goes in through innerHTML — so everything interpolated is escaped. */
    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function money(n) { return '₹' + n; }

    var toastEl = $('#toast');
    var toastTimer;
    function toast(msg) {
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.hidden = false;
        // restart the animation even if a toast is already showing
        toastEl.classList.remove('is-up');
        void toastEl.offsetWidth;
        toastEl.classList.add('is-up');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toastEl.classList.remove('is-up');
            setTimeout(function () { toastEl.hidden = true; }, 300);
        }, 2600);
    }

    /* ═══════════ overlay plumbing ═══════════
       One scrim, one open panel, one place that knows how to
       give focus back to whatever opened it. */

    var scrim = $('#scrim');
    var openPanel = null;
    var lastFocus = null;

    var FOCUSABLE =
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function openOverlay(panel) {
        if (openPanel === panel) return;
        if (openPanel) closeOverlay(true);

        lastFocus = document.activeElement;
        panel.hidden = false;
        scrim.hidden = false;
        // one frame, so the transition has a start state to move from
        requestAnimationFrame(function () {
            scrim.classList.add('is-on');
            panel.classList.add('is-on');
        });
        document.body.classList.add('is-locked');
        openPanel = panel;

        var first = panel.querySelector(FOCUSABLE);
        if (first) first.focus();
    }

    function closeOverlay(silent) {
        if (!openPanel) return;
        var panel = openPanel;
        openPanel = null;

        panel.classList.remove('is-on');
        scrim.classList.remove('is-on');
        document.body.classList.remove('is-locked');

        var done = function () {
            panel.hidden = true;
            scrim.hidden = true;
        };
        if (reduced) done(); else setTimeout(done, 260);

        if (!silent && lastFocus && lastFocus.focus) lastFocus.focus();
        lastFocus = null;
    }

    scrim.addEventListener('click', function () { closeOverlay(); });

    document.addEventListener('click', function (e) {
        var closer = e.target.closest('[data-close]');
        if (closer && openPanel && openPanel.contains(closer)) closeOverlay();
    });

    document.addEventListener('keydown', function (e) {
        if (!openPanel) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeOverlay();
            return;
        }

        if (e.key !== 'Tab') return;

        // keep tabbing inside the open panel
        var items = $$(FOCUSABLE, openPanel).filter(function (n) {
            return n.offsetParent !== null;
        });
        if (!items.length) return;

        var first = items[0];
        var last = items[items.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    /* clicking the backdrop area of a centred modal closes it too */
    $$('.modal').forEach(function (m) {
        m.addEventListener('click', function (e) {
            if (e.target === m) closeOverlay();
        });
    });

    /* ═══════════ basket ═══════════ */

    var CART_KEY = 'prepd.cart.v1';
    var cart = [];

    function loadCart() {
        try {
            var raw = localStorage.getItem(CART_KEY);
            var saved = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(saved)) return;
            // drop anything whose product or weight no longer exists
            cart = saved.filter(function (line) {
                var p = productById(line.id);
                return p && p.weights.indexOf(line.weight) > -1 && line.qty > 0;
            });
        } catch (err) {
            cart = [];
        }
    }

    function saveCart() {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        } catch (err) {
            /* private mode, quota — the basket just won't survive a reload */
        }
    }

    function productById(id) {
        for (var i = 0; i < D.PRODUCTS.length; i++) {
            if (D.PRODUCTS[i].id === id) return D.PRODUCTS[i];
        }
        return null;
    }

    function cartCount() {
        return cart.reduce(function (n, l) { return n + l.qty; }, 0);
    }

    function cartSubtotal() {
        return cart.reduce(function (sum, l) {
            var p = productById(l.id);
            return p ? sum + D.unitPrice(p, l.weight) * l.qty : sum;
        }, 0);
    }

    var FREE_DELIVERY_OVER = 299;
    var DELIVERY_FEE = 35;

    function deliveryFee() {
        var sub = cartSubtotal();
        return sub === 0 || sub >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
    }

    function addToCart(id, weight) {
        var line = null;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id === id && cart[i].weight === weight) { line = cart[i]; break; }
        }
        if (line) line.qty += 1;
        else cart.push({ id: id, weight: weight, qty: 1 });

        saveCart();
        renderCart();

        var p = productById(id);
        toast(p ? p.name + ' added to the basket' : 'Added to the basket');
    }

    function changeQty(id, weight, delta) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id === id && cart[i].weight === weight) {
                cart[i].qty += delta;
                if (cart[i].qty <= 0) cart.splice(i, 1);
                break;
            }
        }
        saveCart();
        renderCart();
    }

    function removeLine(id, weight) {
        cart = cart.filter(function (l) { return !(l.id === id && l.weight === weight); });
        saveCart();
        renderCart();
    }

    var cartBody = $('#cartBody');
    var cartFoot = $('#cartFoot');
    var cartCountEl = $('#cartCount');

    function renderCart() {
        var n = cartCount();
        if (cartCountEl) {
            cartCountEl.textContent = n;
            cartCountEl.hidden = n === 0;
        }
        var btn = $('#cartBtn');
        if (btn) {
            btn.setAttribute(
                'aria-label',
                n === 0 ? 'Open basket, empty' : 'Open basket, ' + n + ' item' + (n === 1 ? '' : 's')
            );
        }

        if (!cart.length) {
            cartBody.innerHTML =
                '<div class="cart-empty">' +
                '<p>Your basket is empty.</p>' +
                '<button class="btn btn-outline" type="button" data-goto-shop>Browse the packs</button>' +
                '</div>';
            cartFoot.hidden = true;
            return;
        }

        cartBody.innerHTML = cart
            .map(function (l) {
                var p = productById(l.id);
                if (!p) return '';
                var unit = D.unitPrice(p, l.weight);
                return (
                    '<article class="cart-line">' +
                    '<img src="' + esc(p.image) + '" alt="" loading="lazy" />' +
                    '<div class="cart-line-body">' +
                    '<h3>' + esc(p.name) + '</h3>' +
                    '<p class="mono cart-line-weight">' + esc(l.weight) + '</p>' +
                    '<div class="qty" role="group" aria-label="Quantity for ' + esc(p.name) + '">' +
                    '<button type="button" class="qty-btn" data-qty="-1" data-id="' + esc(l.id) + '" data-weight="' + esc(l.weight) + '" aria-label="One fewer">&minus;</button>' +
                    '<span class="mono qty-n">' + l.qty + '</span>' +
                    '<button type="button" class="qty-btn" data-qty="1" data-id="' + esc(l.id) + '" data-weight="' + esc(l.weight) + '" aria-label="One more">+</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="cart-line-end">' +
                    '<p class="mono cart-line-price">' + money(unit * l.qty) + '</p>' +
                    '<button type="button" class="linklike cart-remove" data-remove data-id="' + esc(l.id) + '" data-weight="' + esc(l.weight) + '">Remove</button>' +
                    '</div>' +
                    '</article>'
                );
            })
            .join('');

        var sub = cartSubtotal();
        var fee = deliveryFee();

        $('#cartSubtotal').textContent = money(sub);
        $('#cartDelivery').textContent = fee === 0 ? 'Free' : money(fee);
        $('#cartTotal').textContent = money(sub + fee);
        $('#cartHint').textContent =
            fee === 0
                ? 'Delivery is on us.'
                : 'Add ' + money(FREE_DELIVERY_OVER - sub) + ' more for free delivery.';

        cartFoot.hidden = false;
    }

    cartBody.addEventListener('click', function (e) {
        var q = e.target.closest('[data-qty]');
        if (q) { changeQty(q.dataset.id, q.dataset.weight, Number(q.dataset.qty)); return; }

        var r = e.target.closest('[data-remove]');
        if (r) { removeLine(r.dataset.id, r.dataset.weight); return; }

        if (e.target.closest('[data-goto-shop]')) {
            closeOverlay();
            var shop = $('#shop');
            if (shop) {
                window.scrollTo({
                    top: shop.getBoundingClientRect().top + window.scrollY - 72,
                    behavior: reduced ? 'auto' : 'smooth'
                });
            }
        }
    });

    var cartBtn = $('#cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function () { openOverlay($('#cartDrawer')); });
    }

    /* ═══════════ catalogue ═══════════ */

    var filterState = 'all';
    var searchTerm = '';

    var grid = $('#shopGrid');
    var countEl = $('#shopCount');
    var emptyEl = $('#shopEmpty');

    function matches(p) {
        if (filterState !== 'all' && p.category !== filterState) return false;
        if (!searchTerm) return true;

        var hay = [p.name, p.subtitle, p.description, p.tags.join(' '), p.ingredients.join(' ')]
            .join(' ')
            .toLowerCase();
        // every word has to appear somewhere, so "oats protein" narrows rather than widens
        return searchTerm.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
    }

    function productCard(p) {
        return (
            '<article class="pcard" data-reveal>' +
            '<button class="pcard-media" type="button" data-product="' + esc(p.id) + '" aria-label="' + esc(p.name) + ' — see details">' +
            '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" />' +
            (p.badge ? '<span class="pcard-badge mono">' + esc(p.badge) + '</span>' : '') +
            '</button>' +

            '<div class="pcard-body">' +
            '<h3><button type="button" class="pcard-title" data-product="' + esc(p.id) + '">' + esc(p.name) + '</button></h3>' +
            '<p class="pcard-sub">' + esc(p.subtitle) + '</p>' +

            '<ul class="pcard-tags">' +
            p.tags.map(function (t) { return '<li class="mono">' + esc(t) + '</li>'; }).join('') +
            '</ul>' +

            '<dl class="pcard-spec mono">' +
            '<div><dt>Prep</dt><dd>' + esc(p.prepTime) + '</dd></div>' +
            '<div><dt>Keeps</dt><dd>' + esc(p.shelfLife) + '</dd></div>' +
            '<div><dt>Store</dt><dd>' + esc(p.temp) + '</dd></div>' +
            '</dl>' +

            '<div class="pcard-buy">' +
            '<label class="sr-only" for="w-' + esc(p.id) + '">Pack size for ' + esc(p.name) + '</label>' +
            '<select class="pcard-weight mono" id="w-' + esc(p.id) + '" data-weight-for="' + esc(p.id) + '">' +
            p.weights
                .map(function (w) {
                    return '<option value="' + esc(w) + '"' + (w === p.defaultWeight ? ' selected' : '') + '>' + esc(w) + '</option>';
                })
                .join('') +
            '</select>' +
            '<p class="pcard-price mono" data-price-for="' + esc(p.id) + '">' + money(D.unitPrice(p, p.defaultWeight)) + '</p>' +
            '</div>' +

            '\u003cbutton class="btn btn-solid pcard-add" type="button" data-add="' + esc(p.id) + '"\u003eAdd to basket\u003c/button\u003e' +
            '\u003ca class="btn btn-outline pcard-order" href="https://wa.me/918891004474?text=' + encodeURIComponent("Hi PREP'D! I'd like to order ") + esc(p.name) + encodeURIComponent('.') + '" target="_blank" rel="noopener"\u003eOrder Now\u003c/a\u003e' +
            '\u003c/div\u003e' +
            '\u003c/article\u003e'
        );
    }

    function renderShop() {
        var list = D.PRODUCTS.filter(matches);

        grid.innerHTML = list.map(productCard).join('');
        emptyEl.hidden = list.length > 0;
        countEl.textContent =
            list.length === D.PRODUCTS.length
                ? D.PRODUCTS.length + ' packs'
                : list.length + ' of ' + D.PRODUCTS.length + ' packs';

        // cards arrive after the initial ScrollTrigger pass, so reveal them here
        $$('[data-reveal]', grid).forEach(function (el) { el.classList.add('is-in'); });
    }

    /* filters */
    var filterBar = $('#shopFilters');
    filterBar.innerHTML = D.CATEGORIES.map(function (c, i) {
        return (
            '<button type="button" role="tab" class="chip' + (i === 0 ? ' is-on' : '') + '" ' +
            'aria-selected="' + (i === 0) + '" data-cat="' + esc(c.id) + '">' + esc(c.label) + '</button>'
        );
    }).join('');

    filterBar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-cat]');
        if (!b) return;
        filterState = b.dataset.cat;
        $$('.chip', filterBar).forEach(function (c) {
            var on = c === b;
            c.classList.toggle('is-on', on);
            c.setAttribute('aria-selected', String(on));
        });
        renderShop();
    });

    /* search — debounced so a fast typist doesn't re-render per keystroke */
    var searchInput = $('#shopSearch');
    var searchTimer;
    searchInput.addEventListener('input', function () {
        clearTimeout(searchTimer);
        var v = this.value.trim().toLowerCase();
        searchTimer = setTimeout(function () {
            searchTerm = v;
            renderShop();
        }, 140);
    });

    $('#shopReset').addEventListener('click', function () {
        filterState = 'all';
        searchTerm = '';
        searchInput.value = '';
        $$('.chip', filterBar).forEach(function (c, i) {
            c.classList.toggle('is-on', i === 0);
            c.setAttribute('aria-selected', String(i === 0));
        });
        renderShop();
    });

    /* card interactions */
    grid.addEventListener('change', function (e) {
        var sel = e.target.closest('[data-weight-for]');
        if (!sel) return;
        var p = productById(sel.dataset.weightFor);
        var priceEl = grid.querySelector('[data-price-for="' + sel.dataset.weightFor + '"]');
        if (p && priceEl) priceEl.textContent = money(D.unitPrice(p, sel.value));
    });

    grid.addEventListener('click', function (e) {
        var add = e.target.closest('[data-add]');
        if (add) {
            var id = add.dataset.add;
            var sel = grid.querySelector('[data-weight-for="' + id + '"]');
            var p = productById(id);
            addToCart(id, sel ? sel.value : p.defaultWeight);
            return;
        }

        var open = e.target.closest('[data-product]');
        if (open) showProduct(open.dataset.product);
    });

    /* ─────────── product detail ─────────── */

    function showProduct(id) {
        var p = productById(id);
        if (!p) return;

        var n = p.nutrition;
        var rows = [
            ['Calories', n.calories],
            ['Protein', n.protein],
            ['Carbs', n.carbs],
            ['Fat', n.fat],
            ['Fibre', n.fiber]
        ].filter(function (r) { return r[1]; });

        $('#productBody').innerHTML =
            '<div class="pdetail">' +
            '<figure class="pdetail-media">' +
            '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" />' +
            '</figure>' +

            '<div class="pdetail-copy">' +
            (p.badge ? '<span class="pcard-badge mono is-inline">' + esc(p.badge) + '</span>' : '') +
            '<h2 id="productTitle">' + esc(p.name) + '</h2>' +
            '<p class="pdetail-sub">' + esc(p.subtitle) + '</p>' +
            '<p class="pdetail-desc">' + esc(p.description) + '</p>' +

            '<h3 class="mini-head mono">What is inside</h3>' +
            '<ul class="chiplist">' +
            p.ingredients.map(function (i) { return '<li class="mono">' + esc(i) + '</li>'; }).join('') +
            '</ul>' +

            '<h3 class="mini-head mono">Per serving</h3>' +
            '<dl class="ntable mono">' +
            rows.map(function (r) { return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') +
            '</dl>' +
            (n.vitamins && n.vitamins.length
                ? '<ul class="chiplist chiplist-soft">' +
                  n.vitamins.map(function (v) { return '<li class="mono">' + esc(v) + '</li>'; }).join('') +
                  '</ul>'
                : '') +

            '<h3 class="mini-head mono">Keeping it</h3>' +
            '<p class="pdetail-store">' + esc(p.storage) + '</p>' +
            '<p class="pdetail-store mono">' + esc(p.shelfLife) + ' &middot; ' + esc(p.temp) + '</p>' +

            (p.recipeSuggestion
                ? '<div class="pdetail-tip"><h3 class="mini-head mono">How to cook it</h3><p>' + esc(p.recipeSuggestion) + '</p></div>'
                : '') +

            '<div class="pdetail-buy">' +
            '<label class="sr-only" for="pd-weight">Pack size</label>' +
            '<select class="pcard-weight mono" id="pd-weight">' +
            p.weights
                .map(function (w) {
                    return '<option value="' + esc(w) + '"' + (w === p.defaultWeight ? ' selected' : '') + '>' + esc(w) + '</option>';
                })
                .join('') +
            '</select>' +
            '<p class="pcard-price mono" id="pd-price">' + money(D.unitPrice(p, p.defaultWeight)) + '</p>' +
            '<button class="btn btn-solid" type="button" id="pd-add">Add to basket</button>' +
            '</div>' +
            '</div>' +
            '</div>';

        var sel = $('#pd-weight');
        sel.addEventListener('change', function () {
            $('#pd-price').textContent = money(D.unitPrice(p, sel.value));
        });
        $('#pd-add').addEventListener('click', function () {
            addToCart(p.id, sel.value);
            closeOverlay();
        });

        openOverlay($('#productModal'));
    }

    /* ═══════════ checkout ═══════════ */

    var citySel = $('#ordCity');
    citySel.innerHTML = D.DELIVERY_CITIES.map(function (c) {
        return '<option>' + esc(c) + '</option>';
    }).join('');

    var slotSel = $('#ordSlot');
    slotSel.innerHTML = D.TIME_SLOTS.map(function (s) {
        return '<option>' + esc(s) + '</option>';
    }).join('');

    function openCheckout() {
        if (!cart.length) {
            toast('Add a pack to the basket first');
            return;
        }

        var sub = cartSubtotal();
        var fee = deliveryFee();

        $('#orderSummary').innerHTML =
            '<h3 class="mini-head mono">' + cartCount() + ' item' + (cartCount() === 1 ? '' : 's') + '</h3>' +
            '<ul class="order-lines mono">' +
            cart
                .map(function (l) {
                    var p = productById(l.id);
                    if (!p) return '';
                    return (
                        '<li><span>' + esc(p.name) + ' (' + esc(l.weight) + ') &times; ' + l.qty + '</span>' +
                        '<span>' + money(D.unitPrice(p, l.weight) * l.qty) + '</span></li>'
                    );
                })
                .join('') +
            '<li class="order-line-total"><span>Total, including delivery</span><span>' + money(sub + fee) + '</span></li>' +
            '</ul>';

        openOverlay($('#orderModal'));
    }

    $('#checkoutBtn').addEventListener('click', openCheckout);

    $('#orderForm').addEventListener('submit', function (e) {
        e.preventDefault();
        if (!this.reportValidity()) return;
        if (!cart.length) { toast('Your basket is empty'); return; }

        var sub = cartSubtotal();
        var fee = deliveryFee();

        var lines = cart
            .map(function (l) {
                var p = productById(l.id);
                if (!p) return '';
                return '• ' + p.name + ' (' + l.weight + ') × ' + l.qty + ' = ' + money(D.unitPrice(p, l.weight) * l.qty);
            })
            .filter(Boolean)
            .join('\n');

        var msg =
            'New Prep D order\n' +
            '----------------------\n' +
            'Name: ' + $('#ordName').value.trim() + '\n' +
            'Phone: ' + $('#ordPhone').value.trim() + '\n' +
            'Address: ' + $('#ordAddress').value.trim() + ', ' + citySel.value + '\n' +
            'Slot: ' + slotSel.value + '\n\n' +
            'Packs:\n' + lines + '\n\n' +
            'Subtotal: ' + money(sub) + '\n' +
            'Delivery: ' + (fee === 0 ? 'Free' : money(fee)) + '\n' +
            'Total: ' + money(sub + fee) + '\n' +
            'Notes: ' + ($('#ordNotes').value.trim() || '—');

        window.open(D.wa(msg), '_blank', 'noopener');

        closeOverlay();
        toast('Order opened in WhatsApp — send it to confirm');
        // the basket stays put: nothing is confirmed until they hit send
    });

    /* ═══════════ recipes ═══════════ */

    $('#recipeGrid').innerHTML = D.RECIPES.map(function (r) {
        return (
            '<article class="rcard" data-reveal>' +
            '<button class="rcard-media" type="button" data-recipe="' + esc(r.id) + '" aria-label="' + esc(r.dish) + ' — read the method">' +
            '<img src="' + esc(r.image) + '" alt="' + esc(r.dish) + '" loading="lazy" />' +
            '<span class="rcard-time mono">' + esc(r.prepDuration) + '</span>' +
            '</button>' +
            '<div class="rcard-body">' +
            '<p class="rcard-cat mono">' + esc(r.category) + ' &middot; ' + esc(r.difficulty) + '</p>' +
            '<h3><button type="button" class="pcard-title" data-recipe="' + esc(r.id) + '">' + esc(r.dish) + '</button></h3>' +
            '<p class="rcard-kit">' + esc(r.kitUsed) + '</p>' +
            '<p class="rcard-meta mono">Serves ' + esc(r.servings) + ' &middot; ' + r.steps.length + ' steps</p>' +
            '</div>' +
            '</article>'
        );
    }).join('');

    $('#recipeGrid').addEventListener('click', function (e) {
        var b = e.target.closest('[data-recipe]');
        if (!b) return;

        var r = D.RECIPES.filter(function (x) { return x.id === b.dataset.recipe; })[0];
        if (!r) return;

        $('#recipeBody').innerHTML =
            '<div class="rdetail">' +
            '<figure class="rdetail-media"><img src="' + esc(r.image) + '" alt="' + esc(r.dish) + '" /></figure>' +
            '<div class="rdetail-copy">' +
            '<p class="section-tag mono">' + esc(r.category) + ' &middot; ' + esc(r.difficulty) + '</p>' +
            '<h2 id="recipeTitle">' + esc(r.dish) + '</h2>' +
            '<p class="rdetail-kit">' + esc(r.kitUsed) + '</p>' +
            '<dl class="ntable mono rdetail-meta">' +
            '<div><dt>Time</dt><dd>' + esc(r.prepDuration) + '</dd></div>' +
            '<div><dt>Serves</dt><dd>' + esc(r.servings) + '</dd></div>' +
            '</dl>' +

            '<h3 class="mini-head mono">Method</h3>' +
            '<ol class="rsteps">' +
            r.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') +
            '</ol>' +

            (r.chefTips && r.chefTips.length
                ? '<h3 class="mini-head mono">Chef notes</h3><ul class="rtips">' +
                  r.chefTips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') +
                  '</ul>'
                : '') +
            '</div>' +
            '</div>';

        openOverlay($('#recipeModal'));
    });

    /* ═══════════ reviews ═══════════ */

    function stars(n) {
        var out = '';
        for (var i = 0; i < 5; i++) out += i < n ? '★' : '☆';
        return out;
    }

    $('#reviewGrid').innerHTML = D.REVIEWS.map(function (r) {
        return (
            '<figure class="review" data-reveal>' +
            '<p class="review-stars" aria-label="' + r.rating + ' out of 5">' + stars(r.rating) + '</p>' +
            '<blockquote>' + esc(r.comment) + '</blockquote>' +
            '<figcaption>' +
            '<span class="review-name">' + esc(r.author) + '</span>' +
            '<span class="review-role mono">' + esc(r.role) + ' &middot; ' + esc(r.location) + '</span>' +
            '<span class="review-order mono">Ordered: ' + esc(r.productOrdered) + '</span>' +
            '<span class="review-date mono">' + esc(r.date) + (r.verified ? ' &middot; verified order' : '') + '</span>' +
            '</figcaption>' +
            '</figure>'
        );
    }).join('');

    /* ═══════════ bulk sectors ═══════════ */

    $('#sectorGrid').innerHTML = D.BULK_SECTORS.map(function (s, i) {
        return (
            '<article class="sector" data-reveal>' +
            '<span class="sector-num mono">' + ('0' + (i + 1)).slice(-2) + '</span>' +
            '<h3>' + esc(s.name) + '</h3>' +
            '<p>' + esc(s.desc) + '</p>' +
            '<p class="sector-ideal mono">' + esc(s.ideal) + '</p>' +
            '</article>'
        );
    }).join('');

    /* ═══════════ distributor ═══════════ */

    $('#distBenefits').innerHTML = D.DISTRIBUTOR_BENEFITS.map(function (b) {
        return (
            '<article class="dben" data-reveal>' +
            '<h3>' + esc(b.title) + '</h3>' +
            '<p>' + esc(b.desc) + '</p>' +
            '</article>'
        );
    }).join('');

    $('#distRequirements').innerHTML = D.DISTRIBUTOR_REQUIREMENTS.map(function (r) {
        return '<li>' + esc(r) + '</li>';
    }).join('');

    $('#distForm').addEventListener('submit', function (e) {
        e.preventDefault();
        if (!this.reportValidity()) return;

        var msg =
            'Distributor enquiry\n' +
            '----------------------\n' +
            'Name: ' + $('#distName').value.trim() + '\n' +
            'Firm: ' + $('#distFirm').value.trim() + '\n' +
            'Phone: ' + $('#distPhone').value.trim() + '\n' +
            'Territory: ' + $('#distTerritory').value.trim() + '\n' +
            'Cold storage: ' + $('#distStorage').value;

        window.open(D.wa(msg), '_blank', 'noopener');
        toast('Enquiry opened in WhatsApp — send it to reach us');
    });

    /* ═══════════ careers ═══════════ */

    $('#jobList').innerHTML = D.OPENINGS.map(function (j, i) {
        return (
            '<article class="job" data-reveal>' +
            '<button class="job-head" type="button" aria-expanded="false" aria-controls="job-p-' + i + '">' +
            '<span class="job-title">' +
            '<span class="job-name">' + esc(j.title) + '</span>' +
            '<span class="job-meta mono">' + esc(j.department) + ' &middot; ' + esc(j.location) + '</span>' +
            '</span>' +
            '<span class="job-tags mono">' + esc(j.type) + ' &middot; ' + esc(j.experience) + '</span>' +
            '<span class="acc-mark" aria-hidden="true"></span>' +
            '</button>' +

            '<div class="job-panel" id="job-p-' + i + '" hidden>' +
            '<p>' + esc(j.description) + '</p>' +
            '<h4 class="mini-head mono">What we need</h4>' +
            '<ul class="req-list">' +
            j.requirements.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') +
            '</ul>' +
            '<a class="btn btn-outline" target="_blank" rel="noopener" href="' +
            esc(D.wa('Hi Prep D! I would like to apply for the ' + j.title + ' role. I will attach my CV here.')) +
            '">Apply on WhatsApp</a>' +
            '</div>' +
            '</article>'
        );
    }).join('');

    /* ═══════════ journal ═══════════ */

    $('#postGrid').innerHTML = D.POSTS.map(function (p) {
        return (
            '<article class="post" data-reveal>' +
            '<button class="post-media" type="button" data-post="' + esc(p.id) + '" aria-label="' + esc(p.title) + ' — read">' +
            '<img src="' + esc(p.image) + '" alt="" loading="lazy" />' +
            '</button>' +
            '<div class="post-body">' +
            '<p class="post-cat mono">' + esc(p.category) + ' &middot; ' + esc(p.readTime) + '</p>' +
            '<h3><button type="button" class="pcard-title" data-post="' + esc(p.id) + '">' + esc(p.title) + '</button></h3>' +
            '<p class="post-excerpt">' + esc(p.excerpt) + '</p>' +
            '<p class="post-meta mono">' + esc(p.author) + ' &middot; ' + esc(p.date) + '</p>' +
            '</div>' +
            '</article>'
        );
    }).join('');

    $('#postGrid').addEventListener('click', function (e) {
        var b = e.target.closest('[data-post]');
        if (!b) return;

        var p = D.POSTS.filter(function (x) { return x.id === b.dataset.post; })[0];
        if (!p) return;

        $('#postBody').innerHTML =
            '<article class="pdetail-post">' +
            '<img class="post-hero" src="' + esc(p.image) + '" alt="" />' +
            '<p class="section-tag mono">' + esc(p.category) + ' &middot; ' + esc(p.readTime) + '</p>' +
            '<h2 id="postTitle">' + esc(p.title) + '</h2>' +
            '<p class="post-meta mono">' + esc(p.author) + ' &middot; ' + esc(p.date) + '</p>' +
            p.content.map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('') +
            '</article>';

        openOverlay($('#postModal'));
    });

    /* ═══════════ faq ═══════════ */

    var faqCat = 'all';
    var faqList = $('#faqList');

    $('#faqFilters').innerHTML = D.FAQ_CATEGORIES.map(function (c, i) {
        return (
            '<button type="button" role="tab" class="chip' + (i === 0 ? ' is-on' : '') + '" ' +
            'aria-selected="' + (i === 0) + '" data-faq-cat="' + esc(c.id) + '">' + esc(c.label) + '</button>'
        );
    }).join('');

    function renderFaq() {
        var list = D.FAQS.filter(function (f) { return faqCat === 'all' || f.category === faqCat; });

        faqList.innerHTML = list
            .map(function (f, i) {
                return (
                    '<div class="acc" data-reveal>' +
                    '<button class="acc-head" type="button" aria-expanded="false" aria-controls="faq-p-' + i + '">' +
                    '<span>' + esc(f.q) + '</span>' +
                    '<span class="acc-mark" aria-hidden="true"></span>' +
                    '</button>' +
                    '<div class="acc-panel" id="faq-p-' + i + '" hidden><p>' + esc(f.a) + '</p></div>' +
                    '</div>'
                );
            })
            .join('');

        $$('[data-reveal]', faqList).forEach(function (el) { el.classList.add('is-in'); });
    }
    renderFaq();

    $('#faqFilters').addEventListener('click', function (e) {
        var b = e.target.closest('[data-faq-cat]');
        if (!b) return;
        faqCat = b.dataset.faqCat;
        $$('.chip', this).forEach(function (c) {
            var on = c === b;
            c.classList.toggle('is-on', on);
            c.setAttribute('aria-selected', String(on));
        });
        renderFaq();
    });

    /* one accordion handler for FAQ and jobs alike */
    document.addEventListener('click', function (e) {
        var head = e.target.closest('.acc-head, .job-head');
        if (!head) return;

        var panel = document.getElementById(head.getAttribute('aria-controls'));
        if (!panel) return;

        var open = head.getAttribute('aria-expanded') === 'true';
        head.setAttribute('aria-expanded', String(!open));
        panel.hidden = open;
        head.parentElement.classList.toggle('is-open', !open);
    });

    /* ═══════════ nutrition extras ═══════════ */

    if ($('#nutritionFacts')) {
        $('#nutritionFacts').innerHTML = D.NUTRITION_FACTS.map(function (f) {
            return (
                '<article class="nfact" data-reveal>' +
                '<p class="nfact-value mono">' + esc(f.value) + '</p>' +
                '<h3>' + esc(f.title) + '</h3>' +
                '<p>' + esc(f.desc) + '</p>' +
                '</article>'
            );
        }).join('');
    }

    if ($('#eatingTips')) {
        $('#eatingTips').innerHTML = D.EATING_TIPS.map(function (t) {
            return '<li>' + esc(t) + '</li>';
        }).join('');
    }

    if ($('#dailyRoutine')) {
        $('#dailyRoutine').innerHTML = D.DAILY_ROUTINE.map(function (r) {
            return (
                '<li class="routine-item">' +
                '<span class="routine-time mono">' + esc(r.time) + '</span>' +
                '<div class="routine-body">' +
                '<span class="routine-badge mono">' + esc(r.badge) + '</span>' +
                '<h4>' + esc(r.title) + '</h4>' +
                '<p class="routine-pack mono">' + esc(r.packName) + '</p>' +
                '<p>' + esc(r.description) + '</p>' +
                '<p class="routine-mins mono">' +
                (r.prepMinutes === 0 ? 'No prep' : r.prepMinutes + ' min') +
                ' &middot; ' + esc(r.benefits.join(' · ')) +
                '</p>' +
                '</div>' +
                '</li>'
            );
        }).join('');
    }

    if ($('#storageGuide')) {
        $('#storageGuide').innerHTML = D.STORAGE_GUIDE.map(function (s) {
            return (
                '<article class="srow">' +
                '<h4>' + esc(s.title) + '</h4>' +
                '<p class="mono srow-temp">' + esc(s.temp) + '</p>' +
                '<p class="mono srow-life">' + esc(s.shelfLife) + '</p>' +
                '<p class="srow-rule">' + esc(s.rule) + '</p>' +
                '</article>'
            );
        }).join('');
    }

    /* dietary goals */
    var goalTabs = $('#goalTabs');
    var goalPanel = $('#goalPanel');

    if (goalTabs && goalPanel) {
        goalTabs.innerHTML = D.DIETARY_GOALS.map(function (g, i) {
            return (
                '<button type="button" role="tab" class="chip' + (i === 0 ? ' is-on' : '') + '" ' +
                'aria-selected="' + (i === 0) + '" data-goal="' + esc(g.id) + '">' + esc(g.title) + '</button>'
            );
        }).join('');

        function renderGoal(id) {
            var g = D.DIETARY_GOALS.filter(function (x) { return x.id === id; })[0];
            if (!g) return;

            goalPanel.innerHTML =
                '<p class="goal-desc">' + esc(g.shortDesc) + '</p>' +
                '<h4 class="mini-head mono">Packs that suit it</h4>' +
                '<ul class="chiplist">' +
                g.recommendedPacks.map(function (p) { return '<li class="mono">' + esc(p) + '</li>'; }).join('') +
                '</ul>' +
                '<p class="goal-tip"><span class="mono">Dietitian note</span> ' + esc(g.dietitianTip) + '</p>';
        }
        renderGoal(D.DIETARY_GOALS[0].id);

        goalTabs.addEventListener('click', function (e) {
            var b = e.target.closest('[data-goal]');
            if (!b) return;
            $$('.chip', this).forEach(function (c) {
                var on = c === b;
                c.classList.toggle('is-on', on);
                c.setAttribute('aria-selected', String(on));
            });
            renderGoal(b.dataset.goal);
        });
    }

    /* ═══════════ hubs & delivery check ═══════════ */

    $('#hubGrid').innerHTML = D.HUBS.map(function (h) {
        return (
            '<article class="hub" data-reveal>' +
            '<h4>' + esc(h.name) + '</h4>' +
            '<p class="hub-addr">' + esc(h.address) + '</p>' +
            '<p class="mono hub-hours">' + esc(h.hours) + '</p>' +
            '<p class="mono hub-note">' + esc(h.note) + '</p>' +
            '</article>'
        );
    }).join('');

    $('#areaForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var q = $('#areaInput').value.trim().toLowerCase();
        var out = $('#areaResult');

        if (!q) {
            out.className = 'check-result';
            out.textContent = 'Type a locality first.';
            return;
        }

        var hit = D.DELIVERY_AREAS.filter(function (a) {
            var n = a.name.toLowerCase();
            return n.indexOf(q) > -1 || q.indexOf(n) > -1;
        })[0];

        if (hit) {
            out.className = 'check-result is-yes';
            out.textContent = 'Yes — ' + hit.name + ', ' + hit.slot.toLowerCase() + ' slots.';
        } else {
            // no guessing: an unlisted area goes to a human rather than a maybe
            out.className = 'check-result is-maybe';
            out.innerHTML =
                'Not on our current route list. ' +
                '<a target="_blank" rel="noopener" href="' +
                esc(D.wa('Hi Prep D! Do you deliver to ' + $('#areaInput').value.trim() + '?')) +
                '">Ask us on WhatsApp</a> — we add areas often.';
        }
    });

    /* ═══════════ catalogue request ═══════════ */

    document.addEventListener('click', function (e) {
        if (e.target.closest('[data-open-catalogue]')) openOverlay($('#catalogueModal'));
    });

    $('#catForm').addEventListener('submit', function (e) {
        e.preventDefault();
        if (!this.reportValidity()) return;

        var msg =
            'Catalogue request\n' +
            '----------------------\n' +
            'Name: ' + $('#catName').value.trim() + '\n' +
            'Phone: ' + $('#catPhone').value.trim() + '\n' +
            'Business: ' + ($('#catOrg').value.trim() || '—') + '\n' +
            'Type: ' + $('#catType').value;

        window.open(D.wa(msg), '_blank', 'noopener');
        toast('Request opened in WhatsApp — send it to reach us');
    });

    /* ═══════════ legal ═══════════ */

    document.addEventListener('click', function (e) {
        var b = e.target.closest('[data-open-legal]');
        if (!b) return;

        var doc = D.LEGAL[b.dataset.openLegal];
        if (!doc) return;

        $('#legalBody').innerHTML =
            '<h2 id="legalTitle">' + esc(doc.title) + '</h2>' +
            doc.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');

        openOverlay($('#legalModal'));
    });

    /* ═══════════ go ═══════════ */

    loadCart();
    renderCart();
    renderShop();
})();
