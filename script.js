/* ═══════════════════════════════════════════════
   PREP D — interactions
   Signature: a vacuum pack travels down the process
   rail, transforming at each of the 8 real steps.
   ═══════════════════════════════════════════════ */

(function () {
    'use strict';

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasGSAP = typeof window.gsap !== 'undefined';

    if (hasGSAP && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    /* ─────────── nav ─────────── */
    var nav = document.getElementById('nav');
    var menuBtn = document.getElementById('menuBtn');
    var navLinks = document.getElementById('navLinks');

    function closeMenu() {
        menuBtn.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', function () {
        var open = navLinks.classList.toggle('is-open');
        menuBtn.classList.toggle('is-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
            closeMenu();
            menuBtn.focus();
        }
    });

    /* nav background + floating WhatsApp appear past the hero */
    var waFloat = document.querySelector('.wa-float');

    function onScroll() {
        var y = window.scrollY;
        nav.classList.toggle('is-stuck', y > 24);
        waFloat.classList.toggle('is-shown', y > window.innerHeight * 0.7);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ─────────── anchor scrolling with nav offset ─────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            var offset = (id === '#process') ? 0 : 72;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
        });
    });

    /* ═══════════ REDUCED MOTION: stop here ═══════════
       Content is fully visible via CSS; no scroll effects. */
    if (reduced || !hasGSAP) {
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
            el.classList.add('is-in');
        });
        document.querySelectorAll('.step').forEach(function (s) {
            s.classList.add('is-active');
        });
        return;
    }

    /* ─────────── hero entrance ─────────── */
    var heroBits = gsap.utils.toArray('[data-hero]').sort(function (a, b) {
        return a.dataset.hero - b.dataset.hero;
    });

    gsap.set(heroBits, { opacity: 0, y: 34 });
    gsap.to(heroBits, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.09,
        delay: 0.15
    });

    /* the pack's idle bob is CSS-owned (.hero-pack) — deliberately no
       scroll tween on it, so the two don't fight over `transform`. */

    /* ─────────── ticker ─────────── */
    var track = document.getElementById('tickerTrack');
    if (track) {
        track.innerHTML += track.innerHTML;           // seamless loop
        gsap.to(track, {
            xPercent: -50,
            duration: 26,
            ease: 'none',
            repeat: -1
        });
    }

    /* ─────────── about statement: word-by-word ─────────── */
    var statement = document.querySelector('[data-split]');
    if (statement) {
        var words = statement.textContent.trim().split(/\s+/);
        statement.innerHTML = words.map(function (w) {
            return '<span class="word">' + w + '</span>';
        }).join(' ');

        gsap.from(statement.querySelectorAll('.word'), {
            opacity: 0.14,
            y: 12,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.035,
            scrollTrigger: {
                trigger: statement,
                start: 'top 78%',
                end: 'bottom 62%',
                scrub: 0.5
            }
        });
    }

    /* ─────────── generic reveals ─────────── */
    gsap.utils.toArray('[data-reveal]').forEach(function (el, i) {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: function () {
                gsap.delayedCall((i % 3) * 0.07, function () {
                    el.classList.add('is-in');
                });
            }
        });
    });

    /* claims + standards stagger in */
    gsap.from('.claim', {
        opacity: 0,
        x: -18,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.claims', start: 'top 82%', once: true }
    });

    gsap.from('.std', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '.standards-grid', start: 'top 82%', once: true }
    });

    /* ═══════════════════════════════════════════════
       SIGNATURE: the travelling vacuum pack
       Pack descends the rail while the 8 process steps
       swap. Each stage physically changes the pack —
       washed, sorted, cut, sealed, frosted, delivered.
       ═══════════════════════════════════════════════ */
    var mm = gsap.matchMedia();

    mm.add('(min-width: 901px)', function () {
        return buildProcess(true);
    });

    mm.add('(max-width: 900px)', function () {
        return buildProcess(false);
    });

    function buildProcess(pinned) {
        var stage = document.getElementById('processStage');
        var trackEl = document.getElementById('track');
        var pack = document.getElementById('travelPack');
        var fill = document.getElementById('trackFill');
        var temp = document.getElementById('tpTemp');
        var water = document.getElementById('tpWater');
        var cuts = document.getElementById('tpCuts');
        var frost = document.getElementById('tpFrost');
        var photo = document.getElementById('tpPhoto');
        var steps = gsap.utils.toArray('.step');
        var pills = gsap.utils.toArray('.process-pill');
        var stepCurrent = document.getElementById('stepCurrent');
        var btnPrev = document.getElementById('stepPrev');
        var btnNext = document.getElementById('stepNext');
        if (!stage || !pack) return;

        var STEPS = steps.length;              // 8
        var currentStep = 0;
        var travel = function () {
            return Math.max(trackEl.offsetHeight - pack.offsetHeight, 0);
        };

        /* which step is showing */
        function setStep(i) {
            currentStep = i;
            steps.forEach(function (s, n) {
                s.classList.toggle('is-active', n === i);
            });
            pills.forEach(function (p, n) {
                var active = n === i;
                p.classList.toggle('is-active', active);
                p.setAttribute('aria-selected', String(active));
            });
            if (stepCurrent) {
                stepCurrent.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
            }
            if (btnPrev) btnPrev.disabled = (i === 0);
            if (btnNext) btnNext.disabled = (i === STEPS - 1);
        }
        setStep(0);

        var tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: pinned ? {
                trigger: '.process',
                start: 'top top',
                end: '+=' + (STEPS * 280),
                scrub: 0.6,
                pin: stage,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: function (self) {
                    var i = Math.min(
                        STEPS - 1,
                        Math.floor(self.progress * STEPS * 0.999)
                    );
                    setStep(i);
                }
            } : false
        });

        /* the descent + rail fill run the whole length */
        tl.to(pack, { y: travel, duration: STEPS }, 0)
          .to(fill, { height: '100%', duration: STEPS }, 0);

        /* a gentle sway so the descent doesn't read mechanical */
        tl.to(pack, {
            rotation: 2,
            duration: STEPS / 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1
        }, 0);

        /* 02 washing — droplets bead on the surface */
        tl.to(water, { opacity: 1, duration: 0.4 }, 1)
          .fromTo(water.children,
              { y: -6, opacity: 0 },
              { y: 4, opacity: 1, duration: 0.5, stagger: 0.05 }, 1)
          .to(water, { opacity: 0, duration: 0.4 }, 2.5);

        /* 03 sorting & QC — the contents settle and close in */
        tl.to(photo, {
            scale: 1.06,
            duration: 0.6,
            ease: 'power2.inOut'
        }, 2);

        /* 04 uniform cutting — guides sweep across the produce */
        tl.to(cuts, { opacity: 1, duration: 0.2 }, 3)
          .to(cuts.children, {
              scaleX: 1,
              duration: 0.45,
              stagger: 0.12,
              ease: 'power2.out'
          }, 3)
          .to(cuts, { opacity: 0, duration: 0.35 }, 4.1);

        /* 05 anti-browning — colour lifts and holds */
        tl.to(photo, {
            filter: 'saturate(1.32) brightness(1.06)',
            duration: 0.6
        }, 4.2);

        /* 06 vacuum packing — film draws tight around the contents */
        tl.to('.tp-body', {
            scaleX: 0.9,
            duration: 0.7,
            ease: 'power3.inOut'
        }, 5.1)
          .to(photo, { scale: 1.14, duration: 0.7, ease: 'power3.inOut' }, 5.1)
          .to('.tp-gloss', { opacity: 0.75, duration: 0.5 }, 5.3);

        /* 07 cold storage — frost creeps over, temperature appears */
        tl.to(frost, { opacity: 1, duration: 0.7 }, 6.1)
          .to(temp, { opacity: 1, duration: 0.5 }, 6.3);

        /* 08 delivery — frost clears, pack presents itself */
        tl.to(frost, { opacity: 0.25, duration: 0.6 }, 7.1)
          .to(pack, { scale: 1.06, duration: 0.6, ease: 'back.out(1.6)' }, 7.1);

        /* Interactive jump to step via pills or buttons */
        function goToStep(targetIndex) {
            if (targetIndex < 0 || targetIndex >= STEPS) return;
            if (pinned && tl.scrollTrigger) {
                var st = tl.scrollTrigger;
                var targetProgress = (targetIndex + 0.05) / STEPS;
                var scrollY = st.start + targetProgress * (st.end - st.start);
                window.scrollTo({ top: scrollY, behavior: 'smooth' });
            } else {
                setStep(targetIndex);
                var progress = (targetIndex + 0.05) / STEPS;
                tl.progress(progress);
            }
        }

        pills.forEach(function (pill) {
            pill.addEventListener('click', function () {
                var idx = parseInt(this.dataset.goto, 10);
                goToStep(idx);
            });
        });

        if (btnPrev) {
            btnPrev.addEventListener('click', function () {
                goToStep(currentStep - 1);
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', function () {
                goToStep(currentStep + 1);
            });
        }

        return function cleanup() {
            gsap.set([pack, fill, water, cuts, frost, temp, photo, '.tp-body', '.tp-gloss'],
                { clearProps: 'all' });
        };
    }

    /* ─────────── soon list ─────────── */
    gsap.from('.soon-list li', {
        opacity: 0,
        x: 24,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.09,
        scrollTrigger: { trigger: '.soon-list', start: 'top 84%', once: true }
    });

    /* ─────────── footer wordmark drifts ─────────── */
    gsap.to('.footer-wordmark', {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: {
            trigger: '.footer',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.7
        }
    });

    /* ═══════════ NUTRITION TABS & GOALS ═══════════ */
    var nutriTabs = document.querySelectorAll('.nutri-tab');
    var nutriPanels = document.querySelectorAll('.nutri-tabpanel');

    nutriTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var targetId = 'panel-' + this.dataset.tab;
            nutriTabs.forEach(function (t) {
                var isActive = (t === tab);
                t.classList.toggle('is-active', isActive);
                t.setAttribute('aria-selected', String(isActive));
            });
            nutriPanels.forEach(function (panel) {
                var isTarget = (panel.id === targetId);
                panel.classList.toggle('is-active', isTarget);
                panel.hidden = !isTarget;
            });
            if (window.ScrollTrigger) ScrollTrigger.refresh();
        });
    });

    var DIETARY_GOALS_DATA = {
        weight: {
            title: 'Weight Management & Fat Loss',
            desc: 'High-volume, high-fiber, low-calorie vegetable cuts.',
            packs: ['Fine Shredded Thoran Mix', 'Sprouted Moong Salad Bowl', 'Living Microgreen Trio'],
            tip: 'Filling half your plate with raw or lightly steamed vegetables creates natural satiety while keeping caloric density under 150 kcal per main meal.'
        },
        diabetes: {
            title: 'Blood Sugar & Diabetes Management',
            desc: 'Low glycemic index vegetables that prevent insulin spikes.',
            packs: ['Everyday Mixed Veg Tray', 'Kerala Sambar Vegetable Cuts', 'Roasted Foxnuts'],
            tip: 'The high soluble fiber in drumsticks, ladyfingers, and beans slows glucose absorption in the intestinal tract, stabilizing postprandial blood sugar.'
        },
        immunity: {
            title: 'Immunity & Gut Health Protocol',
            desc: 'Rich in antioxidants, live probiotics, and raw Vitamin C.',
            packs: ['Raw Amla Ginger Tonic', 'Living Hydroponic Microgreens', 'Chilled Tender Coconut Pouch'],
            tip: 'Hydroponic microgreens contain up to 40x higher concentrations of sulforaphane, carotenoids, and live plant enzymes than mature plants.'
        },
        heart: {
            title: 'Heart & Cholesterol Wellness',
            desc: 'Potassium-rich, sodium-free, cold-prepped plant foods.',
            packs: ['Overnight Chia Oats Protein Cup', 'Peeled Shallots & Garlic Duo', '7-Seed Power Mix'],
            tip: 'Natural allicin in fresh peeled garlic paired with plant sterols in oats actively aids in reducing LDL cholesterol and arterial inflammation.'
        }
    };

    var goalPills = document.querySelectorAll('.diet-goal-pill');
    var goalTitle = document.getElementById('dietGoalTitle');
    var goalDesc = document.getElementById('dietGoalDesc');
    var packsList = document.getElementById('dietPacksList');
    var adviceText = document.getElementById('dietAdviceText');

    goalPills.forEach(function (pill) {
        pill.addEventListener('click', function () {
            var goalKey = this.dataset.goal;
            var data = DIETARY_GOALS_DATA[goalKey];
            if (!data) return;

            goalPills.forEach(function (p) {
                var isActive = (p === pill);
                p.classList.toggle('is-active', isActive);
                p.setAttribute('aria-selected', String(isActive));
            });

            if (goalTitle) goalTitle.textContent = data.title;
            if (goalDesc) goalDesc.textContent = data.desc;
            if (adviceText) adviceText.textContent = data.tip;
            if (packsList) {
                packsList.innerHTML = data.packs.map(function (pack) {
                    return '<span class="diet-pack-tag mono">' + pack + '</span>';
                }).join('');
            }
        });
    });

    /* ═══════════ INTERACTIVE KITCHEN CALCULATOR ═══════════ */
    var calcDaysSlider = document.getElementById('calcDaysSlider');
    var calcMembersSlider = document.getElementById('calcMembersSlider');
    var calcDaysVal = document.getElementById('calcDaysVal');
    var calcMembersVal = document.getElementById('calcMembersVal');
    var calcHoursSaved = document.getElementById('calcHoursSaved');
    var calcWasteSaved = document.getElementById('calcWasteSaved');
    var calcMoneySaved = document.getElementById('calcMoneySaved');

    function updateKitchenCalculator() {
        if (!calcDaysSlider || !calcMembersSlider) return;

        var days = parseInt(calcDaysSlider.value, 10);
        var members = parseInt(calcMembersSlider.value, 10);

        if (calcDaysVal) calcDaysVal.textContent = days + (days === 1 ? ' Day' : ' Days');
        if (calcMembersVal) calcMembersVal.textContent = members + (members === 1 ? ' Person' : ' People');

        // Math formula:
        // Minutes saved per week: 42 mins per cooking day
        var minutesSavedPerWeek = days * 42;
        var hoursSavedPerMonth = ((minutesSavedPerWeek * 4.3) / 60).toFixed(1);
        var kgsWasteSavedPerMonth = (days * 0.45 * (members / 3) * 4.3).toFixed(1);
        var rupeesScrapSaved = Math.round(parseFloat(kgsWasteSavedPerMonth) * 42);

        if (calcHoursSaved) calcHoursSaved.textContent = hoursSavedPerMonth + ' hrs';
        if (calcWasteSaved) calcWasteSaved.textContent = kgsWasteSavedPerMonth + ' kg';
        if (calcMoneySaved) calcMoneySaved.textContent = '₹' + rupeesScrapSaved.toLocaleString('en-IN');
    }

    if (calcDaysSlider && calcMembersSlider) {
        calcDaysSlider.addEventListener('input', updateKitchenCalculator);
        calcMembersSlider.addEventListener('input', updateKitchenCalculator);
        updateKitchenCalculator();
    }

    /* recalc once webfonts land, so pin distances are right */
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });

})();

/* ═══════════ FAQ TAB FILTER ═══════════ */
(function () {
    var tabs = document.querySelectorAll('.faq-tab');
    var items = document.querySelectorAll('.faq-item');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var cat = tab.dataset.faqCat;

            /* update active tab */
            tabs.forEach(function (t) { t.classList.remove('is-active'); });
            tab.classList.add('is-active');

            /* show / hide items */
            items.forEach(function (item) {
                if (cat === 'all' || item.dataset.faqCat === cat) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                    item.removeAttribute('open');
                }
            });
        });
    });

    /* Close other open items when one is opened (single-open accordion) */
    items.forEach(function (item) {
        item.addEventListener('toggle', function () {
            if (item.open) {
                items.forEach(function (other) {
                    if (other !== item && other.open) other.removeAttribute('open');
                });
            }
        });
    });
}());

/* ═══════════ NEED HELP POPUP ═══════════ */
(function () {
    var btn   = document.getElementById('waHelpBtn');
    var popup = document.getElementById('waHelpPopup');
    var close = document.getElementById('waHelpClose');
    var input = document.getElementById('waHelpInput');
    var send  = document.getElementById('waHelpSend');
    if (!btn || !popup) return;

    var BASE_URL = 'https://wa.me/918891004474';

    function openPopup() {
        popup.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        if (input) input.focus();
    }
    function closePopup() {
        popup.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
    }

    btn.addEventListener('click', function () {
        popup.hidden ? openPopup() : closePopup();
    });
    if (close) close.addEventListener('click', closePopup);

    /* update the send link with whatever the user typed */
    if (input && send) {
        input.addEventListener('input', function () {
            var msg = input.value.trim();
            send.href = msg
                ? BASE_URL + '?text=' + encodeURIComponent(msg)
                : BASE_URL + '?text=' + encodeURIComponent("Hi PREP'D! I'd like some help.");
        });

        /* send on Enter */
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); send.click(); }
        });
    }

    /* close on Escape */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !popup.hidden) closePopup();
    });
}());

/* ═══════════ PRODUCT CARD — ORDER NOW BUTTON ═══════════
   Watches for product cards rendered by shop.js and appends
   an "Order Now" WhatsApp button to each card's info area. */
(function () {
    var WA_BASE = 'https://wa.me/918891004474?text=';

    function addOrderBtn(card) {
        if (card.querySelector('.card-order-btn')) return; /* already added */

        /* grab product name from the card heading */
        var nameEl = card.querySelector('.prod-name, .card-name, h3, h4');
        var name   = nameEl ? nameEl.textContent.trim() : 'a product';
        var msg    = encodeURIComponent("Hi PREP'D! I'd like to order " + name + '.');

        var btn = document.createElement('a');
        btn.className  = 'btn btn-solid card-order-btn';
        btn.href       = WA_BASE + msg;
        btn.target     = '_blank';
        btn.rel        = 'noopener';
        btn.textContent = 'Order Now';

        /* insert after the card's existing info block */
        var info = card.querySelector('.prod-info, .card-info, .card-body');
        if (info) {
            info.appendChild(btn);
        } else {
            card.appendChild(btn);
        }
    }

    /* Run on initial render and whenever new cards appear (shop.js lazy-renders) */
    function scanCards() {
        var cards = document.querySelectorAll('.prod-card, .product-card, .shop-card');
        cards.forEach(addOrderBtn);
    }

    /* MutationObserver so we catch cards added after DOMContentLoaded */
    var shopGrid = document.getElementById('shopGrid') || document.querySelector('.shop-grid');
    if (shopGrid) {
        var obs = new MutationObserver(scanCards);
        obs.observe(shopGrid, { childList: true, subtree: true });
    }

    /* also scan once the DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scanCards);
    } else {
        scanCards();
    }
}());
