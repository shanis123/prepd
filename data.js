/* ═══════════════════════════════════════════════
   PREP D — content
   Everything the page repeats lives here: products,
   recipes, posts, reviews, roles, questions. The
   narrative sections stay in index.html so the page
   still says something with JS switched off.
   ═══════════════════════════════════════════════ */

window.PREPD = (function () {
    'use strict';

    var WA = '918891004474';

    /* wa.me deep link with a pre-written opening line */
    function wa(text) {
        return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
    }

    /* ─────────── products ─────────── */

    var CATEGORIES = [
        { id: 'all', label: 'Everything' },
        { id: 'ready-to-cook', label: 'Ready to cook' },
        { id: 'ready-to-eat', label: 'Ready to eat' },
        { id: 'frozen-foods', label: 'Frozen' },
        { id: 'healthy-snacks', label: 'Snacks' },
        { id: 'meal-kits', label: 'Meal kits' },
        { id: 'special-products', label: 'Special' }
    ];

    var PRODUCTS = [
        /* ── ready to cook ── */
        {
            id: 'rtc-sambar-cut',
            name: 'Kerala Sambar Vegetable Cuts',
            category: 'ready-to-cook',
            subtitle: 'Triple-washed & recipe-portioned vegetables',
            description:
                'Freshly batoned and cubed drumsticks, shallots (cheriya ulli), yellow pumpkin, carrot, tomato, ladyfinger and brinjal. Vacuum sealed for zero nutrient loss and instant pan tossing.',
            image: 'src-sambar-veg-pack.jpg',
            weights: ['500g (Serves 4)', '1kg (Family Pack)'],
            defaultWeight: '500g (Serves 4)',
            price: 75,
            prepTime: 'Zero prep — cooks in 10 min',
            shelfLife: '4–5 days refrigerated',
            storage: 'Store between 0°C and 4°C in the vegetable crisper. Open and cook directly.',
            temp: '0–4°C chilled',
            ingredients: ['Drumstick', 'Shallots', 'Yellow pumpkin', 'Carrot', 'Tomato', 'Ladyfinger', 'Brinjal', 'Curry leaves'],
            nutrition: {
                calories: '110 kcal / 100g',
                protein: '3.8g',
                carbs: '21g',
                fat: '0.4g',
                fiber: '5.2g',
                vitamins: ['Vitamin A (120%)', 'Vitamin C (85%)', 'Potassium', 'Folate']
            },
            tags: ['Best seller', 'Zero scrap', 'Triple washed'],
            popular: true,
            badge: 'Chef favourite',
            recipeSuggestion:
                'Cook dal in the pressure cooker, empty the Sambar pack straight into the pot with tamarind extract and sambar powder. Simmer 8 minutes and temper.'
        },
        {
            id: 'rtc-diced-mix-tray',
            name: 'Everyday Mixed Veg Diced Tray',
            category: 'ready-to-cook',
            subtitle: 'Five-vegetable precision diced culinary tray',
            description:
                'Precision uniform 6mm dice of orange carrot, French beans, green bell pepper, green peas and sweet corn. Built for fried rice, veg pulao, morning upma or pasta.',
            image: 'src-diced-veg-tray.jpg',
            weights: ['250g Single', '500g Standard', '1kg Bulk'],
            defaultWeight: '500g Standard',
            price: 65,
            prepTime: 'Instant — cooks in 5 min',
            shelfLife: '4 days refrigerated',
            storage: 'Store at 2°C to 4°C in the sealed pouch. Do not freeze.',
            temp: '0–4°C chilled',
            ingredients: ['Orange carrot', 'French green beans', 'Green capsicum', 'Sweet corn', 'Green peas'],
            nutrition: {
                calories: '85 kcal / 100g',
                protein: '3.2g',
                carbs: '16g',
                fat: '0.3g',
                fiber: '4.8g',
                vitamins: ['Beta carotene', 'Vitamin C', 'Lutein']
            },
            tags: ['Everyday essential', '6mm dice', '100% usable'],
            popular: true,
            recipeSuggestion: 'Toss into hot coconut or olive oil with a pinch of pepper for an instant five-minute stir fry.'
        },
        {
            id: 'rtc-cabbage-carrot-thoran',
            name: 'Fine Shredded Thoran Mix',
            category: 'ready-to-cook',
            subtitle: 'Micro-shredded cabbage, carrot & green chilli',
            description:
                'Feather-thin uniform shredded green cabbage with grated carrot and split green chillies. Cuts 25 minutes of knife work down to nothing for a crisp Kerala thoran.',
            image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=900&q=80',
            weights: ['300g (Serves 3)', '600g (Serves 6)'],
            defaultWeight: '300g (Serves 3)',
            price: 48,
            prepTime: 'Cooks in 4 min',
            shelfLife: '3–4 days refrigerated',
            storage: 'Keep chilled in the refrigerator crisper.',
            temp: '0–4°C chilled',
            ingredients: ['Green cabbage', 'Carrot', 'Green chilli', 'Curry leaves'],
            nutrition: {
                calories: '55 kcal / 100g',
                protein: '2.1g',
                carbs: '11g',
                fat: '0.2g',
                fiber: '3.9g',
                vitamins: ['Vitamin K', 'Vitamin C', 'Sulforaphane']
            },
            tags: ['Zero waste', 'Micro shred', 'Quick fry'],
            recipeSuggestion:
                'Crackle mustard seeds and curry leaves in coconut oil, empty the pack, toss three minutes, finish with grated coconut.'
        },
        {
            id: 'rtc-peeled-shallots-garlic',
            name: 'Peeled Shallots & Garlic Duo',
            category: 'ready-to-cook',
            subtitle: '100% skin-free small onions & garlic pods',
            description:
                'Naturally peeled Kerala cheriya ulli and whole aromatic garlic cloves. Ozonated, dried and vacuum sealed — without the tears or the fingernail odour.',
            image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=900&q=80',
            weights: ['250g Pouch', '500g Pouch'],
            defaultWeight: '250g Pouch',
            price: 55,
            prepTime: 'Zero prep',
            shelfLife: '6–7 days refrigerated',
            storage: 'Keep refrigerated in the breathable inner vacuum film.',
            temp: '0–4°C chilled',
            ingredients: ['Kerala shallots (small onion)', 'Peeled garlic cloves'],
            nutrition: {
                calories: '72 kcal / 100g',
                protein: '2.5g',
                carbs: '15g',
                fat: '0.1g',
                fiber: '2.8g',
                vitamins: ['Allicin', 'Quercetin', 'Vitamin B6']
            },
            tags: ['Tear free', 'Essential base', 'Chef pick'],
            popular: true,
            recipeSuggestion: 'Crush gently or fry whole in coconut oil for curries, fish gravies and biryanis.'
        },

        /* ── ready to eat ── */
        {
            id: 'rte-power-oats-cup',
            name: 'Overnight Chia & Oats Protein Cup',
            category: 'ready-to-eat',
            subtitle: 'Rolled oats, almond milk, chia seeds & wild honey',
            description:
                'A chilled ready-to-eat breakfast jar of rolled whole oats, soaked chia, crushed almonds, dates and berry coulis. No cooking — take a spoon and go.',
            image: 'pack-power-breakfast-oats-200g.jpg',
            weights: ['220g Grab Cup', 'Pack of 3 Cups'],
            defaultWeight: '220g Grab Cup',
            price: 85,
            prepTime: 'Ready to eat',
            shelfLife: '3 days refrigerated',
            storage: 'Keep cold (0–4°C). Eat straight from the cup or top with your own nuts.',
            temp: '0–4°C chilled',
            ingredients: ['Rolled oats', 'Almond milk', 'Chia seeds', 'Wild honey', 'Pomegranate arils', 'Pumpkin seeds'],
            nutrition: {
                calories: '230 kcal / cup',
                protein: '9.4g',
                carbs: '36g',
                fat: '6.2g',
                fiber: '7.8g',
                vitamins: ['Omega-3', 'Iron', 'Zinc', 'Magnesium']
            },
            tags: ['High protein', 'Grab & go', 'No added sugar'],
            popular: true,
            badge: 'Morning hit'
        },
        {
            id: 'rte-sprouted-moong-salad',
            name: 'Sprouted Moong & Microgreen Bowl',
            category: 'ready-to-eat',
            subtitle: 'Live enzymes, pomegranate & lemon-cumin dressing',
            description:
                'Tender 36-hour sprouted green gram tossed with live mustard microgreens, crisp cucumber, pomegranate arils and a cold-pressed lemon-cumin dressing cup.',
            image: 'pack-power-breakfast-sprout-mix.jpg',
            weights: ['200g Salad Bowl'],
            defaultWeight: '200g Salad Bowl',
            price: 70,
            prepTime: 'Ready to eat',
            shelfLife: '2–3 days refrigerated',
            storage: 'Refrigerate at 2°C. Pour the dressing just before eating.',
            temp: '0–4°C chilled',
            ingredients: ['Sprouted green gram', 'Mustard microgreens', 'English cucumber', 'Pomegranate', 'Lemon-cumin dressing'],
            nutrition: {
                calories: '145 kcal / bowl',
                protein: '11.2g',
                carbs: '22g',
                fat: '1.8g',
                fiber: '6.5g',
                vitamins: ['Vitamin C', 'Vitamin K', 'Bioactive enzymes']
            },
            tags: ['Live enzymes', 'Dietitian approved', 'Low calorie'],
            popular: true
        },
        {
            id: 'rte-fresh-fruit-detox-bowl',
            name: 'Hydrating Tropical Fruit Medley',
            category: 'ready-to-eat',
            subtitle: 'Dragon fruit, papaya, pineapple & kiwi cuts',
            description:
                'Chilled uniform cubes of ripe red dragon fruit, golden pineapple, farm-fresh papaya and kiwi, scattered with mint. Sealed with zero brown oxidation.',
            image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=900&q=80',
            weights: ['250g Bowl', '500g Sharing Bowl'],
            defaultWeight: '250g Bowl',
            price: 90,
            prepTime: 'Ready to eat',
            shelfLife: '2 days refrigerated',
            storage: 'Store between 0°C and 4°C. Best enjoyed chilled.',
            temp: '0–4°C chilled',
            ingredients: ['Red dragon fruit', 'Golden pineapple', 'Papaya', 'Kiwi', 'Fresh mint'],
            nutrition: {
                calories: '98 kcal / bowl',
                protein: '1.4g',
                carbs: '23g',
                fat: '0.2g',
                fiber: '4.1g',
                vitamins: ['Vitamin C (160%)', 'Bromelain', 'Antioxidants']
            },
            tags: ['Immunity', 'Fresh cut', '100% natural']
        },

        /* ── frozen ── */
        {
            id: 'frz-sweet-corn-superpack',
            name: 'IQF American Sweet Corn',
            category: 'frozen-foods',
            subtitle: 'Individually quick frozen sweet kernels',
            description:
                'Golden, crisp sweet corn kernels shock-frozen within two hours of harvest to lock in moisture, sweetness and cell structure without ice crystals.',
            image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=80',
            weights: ['500g Bag', '1kg Bag'],
            defaultWeight: '500g Bag',
            price: 80,
            prepTime: 'Thaw in 2 min or boil directly',
            shelfLife: '12 months frozen',
            storage: 'Store in a deep freezer at -18°C or below. Reclose the ziplock after opening.',
            temp: '-18°C frozen',
            ingredients: ['100% sweet corn kernels, no additives'],
            nutrition: {
                calories: '86 kcal / 100g',
                protein: '3.3g',
                carbs: '19g',
                fat: '1.2g',
                fiber: '2.7g',
                vitamins: ['Lutein', 'Zeaxanthin', 'Thiamine']
            },
            tags: ['IQF', 'No preservatives', 'Long shelf life'],
            popular: true
        },
        {
            id: 'frz-tender-green-peas',
            name: 'Farm-Fresh IQF Green Peas',
            category: 'frozen-foods',
            subtitle: 'Sweet tender baby peas flash-frozen at source',
            description:
                'Sweet, tender, uniform green peas harvested at peak sugar conversion — keeping the vibrant emerald colour and the sweet pop in every bite.',
            image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=900&q=80',
            weights: ['500g Bag', '1kg Bag'],
            defaultWeight: '500g Bag',
            price: 85,
            prepTime: 'Straight into the pan — 3 min',
            shelfLife: '12 months frozen',
            storage: 'Store in a deep freezer at -18°C. Do not refreeze once thawed.',
            temp: '-18°C frozen',
            ingredients: ['100% whole green peas'],
            nutrition: {
                calories: '81 kcal / 100g',
                protein: '5.4g',
                carbs: '14g',
                fat: '0.4g',
                fiber: '5.7g',
                vitamins: ['Vitamin K', 'Vitamin A', 'Iron']
            },
            tags: ['Flash frozen', 'Plant protein', 'Kitchen staple']
        },
        {
            id: 'frz-kerala-tapioca-cubes',
            name: 'Frozen Kerala Kappa (Tapioca Cubes)',
            category: 'frozen-foods',
            subtitle: 'Peeled, cleaned & ready-to-boil cassava chunks',
            description:
                'Starch-rich Kerala tapioca washed in cold water, peeled and diced into bite-sized chunks before flash freezing. Soft, buttery mashed kappa in ten minutes.',
            image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
            weights: ['1kg Family Pack'],
            defaultWeight: '1kg Family Pack',
            price: 95,
            prepTime: 'Boils in 10 min',
            shelfLife: '9 months frozen',
            storage: 'Keep frozen at -18°C. Add directly to boiling water with turmeric and salt.',
            temp: '-18°C frozen',
            ingredients: ['Selected Kerala tapioca (cassava)'],
            nutrition: {
                calories: '160 kcal / 100g',
                protein: '1.4g',
                carbs: '38g',
                fat: '0.3g',
                fiber: '1.8g',
                vitamins: ['Complex carbohydrates', 'Calcium']
            },
            tags: ['Traditional favourite', 'Effortless prep', 'Zero peeling'],
            popular: true
        },

        /* ── snacks ── */
        {
            id: 'snk-roasted-makhana-crunch',
            name: 'Himalayan Pink Salt Roasted Makhana',
            category: 'healthy-snacks',
            subtitle: 'Slow-roasted foxnuts with cold-pressed olive oil',
            description:
                'Jumbo grade foxnuts roasted in cold-pressed virgin olive oil, seasoned with mineral-rich Himalayan pink salt and cracked black pepper. No palm oil.',
            image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=80',
            weights: ['80g Pouch', '180g Jar'],
            defaultWeight: '80g Pouch',
            price: 90,
            prepTime: 'Ready to crunch',
            shelfLife: '6 months ambient',
            storage: 'Store in a cool dry place away from direct sunlight.',
            temp: 'Room temperature',
            ingredients: ['Jumbo foxnuts (makhana)', 'Cold-pressed olive oil', 'Himalayan pink salt', 'Black pepper'],
            nutrition: {
                calories: '110 kcal / 30g',
                protein: '4.2g',
                carbs: '18g',
                fat: '2.1g',
                fiber: '3.4g',
                vitamins: ['Magnesium', 'Potassium', 'Phosphorus']
            },
            tags: ['Low glycemic', 'Zero cholesterol', 'Gluten free'],
            popular: true
        },
        {
            id: 'snk-7-seed-trail-mix',
            name: 'Raw Activated 7-Seed Power Mix',
            category: 'healthy-snacks',
            subtitle: 'Pumpkin, sunflower, chia, flax, watermelon & hemp',
            description:
                'Sprouted and gently dehydrated seeds mixed with golden raisins and unsweetened dried cranberries. Dense in plant-based omega-3s.',
            image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80',
            weights: ['150g Zip Pouch', '300g Jar'],
            defaultWeight: '150g Zip Pouch',
            price: 130,
            prepTime: 'Ready to eat',
            shelfLife: '6 months ambient',
            storage: 'Keep in an airtight container after opening.',
            temp: 'Ambient / cool place',
            ingredients: ['Pumpkin seeds', 'Sunflower seeds', 'Chia seeds', 'Flax seeds', 'Watermelon seeds', 'Hemp hearts', 'Dried cranberries'],
            nutrition: {
                calories: '160 kcal / 30g',
                protein: '6.8g',
                carbs: '9g',
                fat: '11.5g',
                fiber: '4.9g',
                vitamins: ['Omega-3 fatty acids', 'Zinc', 'Vitamin E']
            },
            tags: ['Superfood', 'Keto friendly', 'Clean fuel']
        },

        /* ── meal kits ── */
        {
            id: 'kit-kerala-aviyal-grand',
            name: 'Kerala Feast Aviyal Kit',
            category: 'meal-kits',
            subtitle: 'Seven-vegetable baton kit with coconut-cumin masala',
            description:
                'Hand-batoned raw plantain, elephant foot yam, carrot, drumstick, snake gourd, cucumber and beans, paired with a fresh grated coconut paste packet and curry leaves.',
            image: 'src-aviyal-meal-kit.jpg',
            weights: ['500g (Serves 4–5)', '1kg (Party Kit)'],
            defaultWeight: '500g (Serves 4–5)',
            price: 110,
            prepTime: 'Ready in 10 min',
            shelfLife: '3–4 days refrigerated',
            storage: 'Keep chilled at 0–4°C. Cook straight from the pack.',
            temp: '0–4°C chilled',
            ingredients: ['Raw plantain', 'Elephant foot yam', 'Carrot', 'Drumstick', 'Snake gourd', 'Cucumber', 'Green beans', 'Fresh coconut paste', 'Curry leaves'],
            nutrition: {
                calories: '135 kcal / serving',
                protein: '3.1g',
                carbs: '24g',
                fat: '3.8g',
                fiber: '6.2g',
                vitamins: ['Dietary fibre', 'Vitamin B6', 'Magnesium', 'Potassium']
            },
            tags: ['Feast special', 'Complete kit', 'QR recipe code'],
            popular: true,
            badge: 'Signature kit',
            recipeSuggestion:
                'Steam the batons with turmeric for six minutes, stir in the included coconut paste and curd, finish with raw virgin coconut oil.'
        },
        {
            id: 'kit-chettinad-veg-kurma',
            name: 'Chettinad Veg Kurma Kit',
            category: 'meal-kits',
            subtitle: 'Floret & potato medley with roasted spice masala',
            description:
                'Precision cut cauliflower florets, green beans, carrots, green peas and baby potatoes with a pouch of stone-ground whole Chettinad masala. Made for appam, parotta or chapathi.',
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80',
            weights: ['500g (Serves 4)', '1kg Kit'],
            defaultWeight: '500g (Serves 4)',
            price: 120,
            prepTime: 'Cooks in 12 min',
            shelfLife: '3–4 days refrigerated',
            storage: 'Store between 0°C and 4°C in the refrigerator.',
            temp: '0–4°C chilled',
            ingredients: ['Cauliflower florets', 'Carrot', 'Green beans', 'Green peas', 'Potatoes', 'Chettinad roasted spice paste', 'Coconut milk powder'],
            nutrition: {
                calories: '150 kcal / serving',
                protein: '4.2g',
                carbs: '22g',
                fat: '5.6g',
                fiber: '5.1g',
                vitamins: ['Vitamin C', 'Curcumin', 'Antioxidants']
            },
            tags: ['Restaurant style', 'Stone-ground masala', 'Zero chop'],
            popular: true
        },
        {
            id: 'kit-veg-dum-biryani-prep',
            name: 'Hyderabadi Veg Biryani Prep Kit',
            category: 'meal-kits',
            subtitle: 'Marinated vegetable mix & premium aged basmati',
            description:
                'Chilled mint-coriander spiced vegetables, caramelised birista onions, a whole garam masala pouch, saffron strands and two-year aged long-grain basmati.',
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80',
            weights: ['800g Complete Kit (Serves 3–4)'],
            defaultWeight: '800g Complete Kit (Serves 3–4)',
            price: 165,
            prepTime: 'Dum in 18 min',
            shelfLife: '4 days refrigerated',
            storage: 'Refrigerate the vegetable kit at 2°C. Keep the rice packet dry.',
            temp: '0–4°C chilled',
            ingredients: ['Diced cauliflower', 'Carrot', 'Beans', 'Green peas', 'Paneer cubes', 'Aged basmati rice', 'Birista onions', 'Whole spices', 'Saffron milk extract'],
            nutrition: {
                calories: '280 kcal / serving',
                protein: '8.5g',
                carbs: '54g',
                fat: '4.2g',
                fiber: '4.6g',
                vitamins: ['B-complex', 'Iron', 'Digestive terpenes']
            },
            tags: ['Weekend feast', 'Aged basmati', 'Layer & dum'],
            popular: true,
            badge: 'Weekend hero'
        },

        /* ── special ── */
        {
            id: 'spc-hydroponic-microgreens',
            name: 'Living Hydroponic Microgreen Trio',
            category: 'special-products',
            subtitle: 'Harvest-fresh radish, broccoli & mustard greens',
            description:
                'Grown pesticide-free in climate-controlled indoor vertical farms, harvested and packed with root intact to deliver far higher nutrient density than mature greens.',
            image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2c56b?auto=format&fit=crop&w=900&q=80',
            weights: ['75g Clamshell Box', '150g Box'],
            defaultWeight: '75g Clamshell Box',
            price: 80,
            prepTime: 'Ready to garnish',
            shelfLife: '6–7 days refrigerated',
            storage: 'Keep inside the protective clamshell at 2°C to 4°C.',
            temp: '0–4°C chilled',
            ingredients: ['Living radish microgreens', 'Broccoli microgreens', 'Mustard microgreens'],
            nutrition: {
                calories: '25 kcal / box',
                protein: '2.8g',
                carbs: '3.5g',
                fat: '0.4g',
                fiber: '2.6g',
                vitamins: ['Sulforaphane', 'Vitamin C', 'Vitamin E', 'Chlorophyll']
            },
            tags: ['Nutrient dense', 'Hydroponic', 'Living greens'],
            popular: true,
            badge: 'Superfood'
        },
        {
            id: 'spc-cold-pressed-immunity-shot',
            name: 'Raw Amla, Ginger & Turmeric Tonic',
            category: 'special-products',
            subtitle: 'Cold-pressed wild gooseberry, ginger & honey',
            description:
                'Cold-pressed by hydraulic slow mastication with no heat. Raw Kerala amla, fresh ginger root, wild turmeric and a dash of black pepper for curcumin absorption.',
            image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80',
            weights: ['200ml Bottle', 'Pack of 6 Shots (6 × 60ml)'],
            defaultWeight: '200ml Bottle',
            price: 60,
            prepTime: 'Ready to sip',
            shelfLife: '4 days refrigerated',
            storage: 'Keep strictly cold (0–4°C). Shake well before opening.',
            temp: '0–4°C chilled',
            ingredients: ['Wild amla (gooseberry)', 'Ginger root juice', 'Fresh turmeric extract', 'Black pepper', 'Forest honey'],
            nutrition: {
                calories: '45 kcal / bottle',
                protein: '0.6g',
                carbs: '10.5g',
                fat: '0.1g',
                fiber: '1.2g',
                vitamins: ['Vitamin C', 'Curcuminoids', 'Gingerols']
            },
            tags: ['No added sugar', 'Cold pressed', 'Immunity']
        },
        {
            id: 'spc-chilled-tender-coconut',
            name: 'Chilled Ozone-Rinsed Tender Coconut Pouch',
            category: 'special-products',
            subtitle: 'Pure coconut water with soft pulp chunks',
            description:
                'Freshly extracted elaneer, filtered, ozonated and sealed into insulated pouches with tender coconut malai scoops. No preservatives, no dilution.',
            image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&w=900&q=80',
            weights: ['300ml Chilled Pouch'],
            defaultWeight: '300ml Chilled Pouch',
            price: 50,
            prepTime: 'Instant',
            shelfLife: '48 hours refrigerated',
            storage: 'Drink immediately or refrigerate at 0°C to 4°C.',
            temp: '0–4°C chilled',
            ingredients: ['100% natural tender coconut water', 'Fresh coconut pulp scoops'],
            nutrition: {
                calories: '60 kcal / pouch',
                protein: '1.2g',
                carbs: '14g',
                fat: '0.2g',
                fiber: '1.1g',
                vitamins: ['Natural electrolytes', 'Potassium', 'Magnesium', 'Sodium']
            },
            tags: ['Natural isotonic', '100% pure', 'Refreshing'],
            popular: true
        }
    ];

    /* Larger formats cost more than the base pack. One rule, applied
       everywhere, so the drawer and the WhatsApp message can never
       disagree about what a line item costs. */
    function unitPrice(product, weight) {
        var bulk = /1kg|Pack of|600g|500g Sharing|300g Jar|180g Jar|150g Box|800g/.test(weight);
        return bulk ? Math.round(product.price * 1.85) : product.price;
    }

    /* ─────────── recipes ─────────── */

    var RECIPES = [
        {
            id: 'sambar-express',
            dish: 'Traditional Kerala Sambar',
            kitUsed: 'Prep D Kerala Sambar Kit (500g)',
            prepDuration: '10 min',
            servings: '4–5 people',
            difficulty: 'Easy',
            category: 'lunch',
            image: 'src-sambar-veg-pack.jpg',
            chefTips: [
                'Do not boil the vegetables longer than seven minutes — ladyfinger and drumstick lose their crunch.',
                'Add the tamarind extract once the vegetables are about 70% soft.',
                'Use cold-pressed coconut oil for the final mustard and curry leaf tempering.'
            ],
            steps: [
                'Pressure cook 1 cup toor dal with a pinch of turmeric and 3 cups water until soft (3 whistles).',
                'Open the Sambar pouch and tip all the pre-washed, pre-cut vegetables straight into the cooker.',
                'Add 2 tbsp tamarind pulp, 2 tbsp sambar powder, ½ tsp asafoetida and salt to taste.',
                'Simmer on a medium flame for 6–7 minutes until the drumstick is tender.',
                'Crackle mustard seeds, dried red chillies and curry leaves in hot coconut oil. Pour over and cover immediately.'
            ]
        },
        {
            id: 'sadya-aviyal-grand',
            dish: 'Authentic Sadya Aviyal',
            kitUsed: 'Prep D Aviyal Kit with coconut paste (500g)',
            prepDuration: '12 min',
            servings: '4–5 people',
            difficulty: 'Easy',
            category: 'lunch',
            image: 'src-aviyal-meal-kit.jpg',
            chefTips: [
                'Cook covered with only half a cup of water — the vegetables release their own juices.',
                'Never boil after adding curd, or it will curdle.',
                'A tablespoon of raw virgin coconut oil at the end is the whole secret to the sadya aroma.'
            ],
            steps: [
                'Tip the baton-cut Aviyal vegetables into a wide thick-bottomed pan with ½ cup water, turmeric and salt.',
                'Cover and steam on a medium flame for seven minutes until just fork-tender.',
                'Coarsely crush 1 cup grated coconut with 3 green chillies and ½ tsp cumin, or use the included paste pouch.',
                'Fold the coconut mixture and 3 tbsp beaten sour curd gently through the steamed vegetables.',
                'Drizzle 1 tbsp raw virgin coconut oil over the hot mix, scatter curry leaves, cover and turn off the flame.'
            ]
        },
        {
            id: 'crisp-cabbage-thoran',
            dish: 'Quick Cabbage & Carrot Thoran',
            kitUsed: 'Prep D Shredded Thoran Mix (300g)',
            prepDuration: '5 min',
            servings: '3–4 people',
            difficulty: 'Very fast',
            category: 'dinner',
            image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=900&q=80',
            chefTips: [
                'Keep the flame high while stir frying to hold the snap and the colour.',
                'Add the fresh grated coconut in the last 30 seconds.'
            ],
            steps: [
                'Heat 1 tbsp coconut oil; crackle mustard seeds, urad dal and fresh curry leaves.',
                'Toss in two crushed shallots and sauté for 20 seconds.',
                'Empty the Thoran pack straight into the pan with a pinch of turmeric and salt.',
                'Stir fry on a medium-high flame for three minutes, uncovered.',
                'Sprinkle 3 tbsp grated coconut, toss once and serve warm with hot rice.'
            ]
        },
        {
            id: 'chettinad-veg-kurma',
            dish: 'Chettinad Hotel-Style Veg Kurma',
            kitUsed: 'Prep D Chettinad Kurma Kit (500g)',
            prepDuration: '14 min',
            servings: '4 people',
            difficulty: 'Medium',
            category: 'dinner',
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80',
            chefTips: ['Use thick first-press coconut milk for the velvety restaurant finish.'],
            steps: [
                'Sauté the pre-peeled shallots and ginger-garlic paste in coconut oil until translucent.',
                'Add the Kurma vegetables — cauliflower, beans, carrot, peas, potato — and sauté two minutes.',
                'Pour in the stone-ground Chettinad spice paste with 1 cup water and salt.',
                'Simmer on medium heat for eight minutes until the gravy thickens.',
                'Stir in coconut milk, garnish with coriander and serve with hot parotta or appam.'
            ]
        }
    ];

    /* ─────────── reviews ─────────── */

    var REVIEWS = [
        {
            id: 'rev-1',
            author: 'Dr. Salman Faris',
            role: 'Cardiologist & busy parent',
            location: 'Manjeri, Malappuram',
            rating: 5,
            comment:
                'With back-to-back hospital rounds, evening cooking used to mean takeout. Prep D changed that for our family. The Sambar and Thoran packs are cleaner than what we wash at home, with zero waste.',
            productOrdered: 'Kerala Sambar Kit & Everyday Veg Tray',
            date: '2 days ago',
            verified: true
        },
        {
            id: 'rev-2',
            author: 'Ananya Nambiar',
            role: 'Software engineer',
            location: 'Chevayur, Calicut',
            rating: 5,
            comment:
                'The peeled shallots and garlic duo alone saves me 20 minutes of crying and smelly hands every day. The Aviyal kit cuts were so uniform my mother thought I chopped them myself.',
            productOrdered: 'Peeled Shallots & Grand Aviyal Kit',
            date: '1 week ago',
            verified: true
        },
        {
            id: 'rev-3',
            author: 'Chef Rajesh Mathew',
            role: 'Head chef, Olive Tree Bistro',
            location: 'Palayam, Kozhikode',
            rating: 5,
            comment:
                'We use Prep D bulk vegetable trays for the daily lunch rush. The 6mm dice is remarkably consistent across 20kg deliveries, and there are no kitchen scraps in our bins.',
            productOrdered: 'Bulk Diced Veg Trays (15kg)',
            date: '3 weeks ago',
            verified: true
        },
        {
            id: 'rev-4',
            author: 'Fathima Rafeeq',
            role: 'Homemaker & nutrition enthusiast',
            location: 'Perinthalmanna',
            rating: 5,
            comment:
                'The 7 AM delivery is consistently cold — I checked with our fridge thermometer. My kids love the overnight oats cup before school.',
            productOrdered: 'Overnight Chia Oats & Microgreen Trio',
            date: '1 month ago',
            verified: true
        }
    ];

    /* ─────────── journal ─────────── */

    var POSTS = [
        {
            id: 'blog-1',
            title: 'The hidden truth about kitchen scrap waste',
            category: 'Healthy food',
            date: 'August 12, 2026',
            readTime: '4 min read',
            author: 'Prep D Culinary Team',
            excerpt:
                'Buy 1kg of raw market vegetables and you often throw away over 350 grams of peel, spoiled ends and dirt. Here is how calibrated ready-to-cook saves your wallet and the bin.',
            image: 'src-diced-veg-tray.jpg',
            content: [
                'In a traditional household, a single pot of sambar means trimming drumsticks, peeling shallots, de-stemming ladyfingers and cutting pumpkin. Studies show that between 30% and 40% of standard market produce is discarded as inedible organic waste before it ever reaches the flame.',
                'Beyond the wasted money, vegetable scraps in wet household bins decay quickly, emitting methane and attracting pests.',
                'Prep D centralises all of that prep waste at our processing hub, where organic trimmings are diverted into compost for partner farms in Wayanad.'
            ]
        },
        {
            id: 'blog-2',
            title: 'Why triple ozonated washing beats chemical bleaching',
            category: 'Nutrition',
            date: 'August 4, 2026',
            readTime: '5 min read',
            author: 'Dr. K. S. Menon, food technologist',
            excerpt:
                'The science of micro-bubble ozonation, and how it strips pesticide residue off a vegetable while leaving the crunchy cell wall completely intact.',
            image: 'src-cold-facility.jpg',
            content: [
                'Ozone (O₃) is one of nature’s most powerful residue-free sanitising agents. Infused into ice-cold water, microscopic ozone bubbles oxidise surface bacteria, fungi and organophosphate pesticide residues on contact.',
                'Unlike the chlorine washes used in conventional packing houses, ozone converts back into ordinary oxygen within minutes, leaving no chemical aftertaste or smell.',
                'The result is produce that tastes as though it were pulled from a backyard garden minutes ago.'
            ]
        },
        {
            id: 'blog-3',
            title: 'Mastering the 10-minute Kerala sadya aviyal at home',
            category: 'Recipes',
            date: 'July 28, 2026',
            readTime: '3 min read',
            author: 'Chef Vineeth Nair',
            excerpt:
                'A step-by-step masterclass on balancing sour curd, stone-ground cumin coconut paste and crunchy batons — without turning any of it to mush.',
            image: 'src-aviyal-meal-kit.jpg',
            content: [
                'The biggest pitfall in traditional aviyal is uneven cooking: plantain turns to mush while the yam stays hard. Prep D solves this with calibrated cut batons that cook at identical thermal rates.',
                'Always steam with the minimum water so the vegetables keep their natural sweetness, and never let the dish boil once the curd has been folded in.'
            ]
        },
        {
            id: 'blog-4',
            title: 'Prep D expands the cold fleet to Calicut city',
            category: 'Company updates',
            date: 'July 15, 2026',
            readTime: '2 min read',
            author: 'Operations desk',
            excerpt:
                'New dedicated cold-chain routes are now active in Chevayur, Palayam, Mavoor Road and West Hill, with 6:30 AM morning slots.',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
            content: [
                'We are glad to announce our expanded direct-to-doorstep refrigerated fleet across Kozhikode district.',
                'Residents can now schedule deliveries before 8:00 AM, so breakfast and lunch prep is done before anyone leaves for work.'
            ]
        }
    ];

    /* ─────────── careers ─────────── */

    var OPENINGS = [
        {
            id: 'job-1',
            title: 'Quality Assurance & Food Safety Officer',
            department: 'Operations & QA',
            location: 'Malappuram central facility',
            type: 'Full-time',
            experience: '2–4 years',
            description:
                'Lead day-to-day incoming produce inspection, ozonated wash verification, HACCP compliance audits and microbial safety testing.',
            requirements: [
                'B.Tech or B.Sc in food science, food technology or microbiology',
                'Hands-on experience with FSSAI, HACCP and cold-chain protocols',
                'A strong eye for raw vegetable quality grading'
            ]
        },
        {
            id: 'job-2',
            title: 'Cold-Chain Logistics Supervisor',
            department: 'Supply chain',
            location: 'Kozhikode & Malappuram hubs',
            type: 'Full-time',
            experience: '1–3 years',
            description:
                'Manage the 5:00 AM dispatch fleet, temperature dataloggers, route optimisation and doorstep delivery SLAs.',
            requirements: [
                'Experience in FMCG or fresh produce route dispatching',
                'Familiarity with GPS routing software and vehicle chillers',
                'Malayalam and English fluency, with leadership skills'
            ]
        },
        {
            id: 'job-3',
            title: 'Area Sales Executive (B2B & retail)',
            department: 'Sales & distribution',
            location: 'Calicut city / Malappuram',
            type: 'Full-time',
            experience: '1–4 years',
            description: 'Expand the Prep D footprint across supermarkets, organic stores, cafes and cloud kitchens.',
            requirements: [
                'A track record in FMCG or retail distribution sales',
                'Strong communication and relationship-building skills',
                'Own two-wheeler with a valid driving licence'
            ]
        },
        {
            id: 'job-4',
            title: 'Culinary Development Chef Assistant',
            department: 'R&D kitchen',
            location: 'Malappuram R&D lab',
            type: 'Full-time',
            experience: '1–2 years',
            description:
                'Assist our chefs in formulating new Kerala meal kits, testing shelf-life kinetics and recording recipe videos.',
            requirements: [
                'Degree or diploma in culinary arts or hotel management',
                'A real interest in Kerala cuisine and clean nutritional cooking',
                'Experience in commercial recipe testing'
            ]
        }
    ];

    /* ─────────── questions ─────────── */

    var FAQ_CATEGORIES = [
        { id: 'all', label: 'All' },
        { id: 'shipping', label: 'Delivery' },
        { id: 'storage', label: 'Storage' },
        { id: 'expiry', label: 'Shelf life' },
        { id: 'returns', label: 'Returns' },
        { id: 'cooking', label: 'Cooking' }
    ];

    var FAQS = [
        {
            category: 'shipping',
            q: 'Where does Prep D deliver, and at what times?',
            a: 'We deliver across the major localities of Malappuram district — Manjeri, Malappuram town, Perinthalmanna, Tirur and Kottakkal — and Kozhikode, including Calicut city, Chevayur, Palayam, Mavoor Road and Feroke. There are two daily slots: morning 6:30–8:30 AM and evening 4:30–7:00 PM.'
        },
        {
            category: 'shipping',
            q: 'How are the vegetables kept fresh in transit?',
            a: 'Every order is dispatched in a temperature-monitored 0–4°C refrigerated vehicle and packed into reusable insulated thermal containers with chilled gel blocks.'
        },
        {
            category: 'storage',
            q: 'How should I store the packs when they arrive?',
            a: 'Put ready-to-cook and ready-to-eat pouches straight into the refrigerator crisper or chilled shelf (0–4°C). Do not freeze the fresh vegetable pouches. Frozen items — corn, peas, tapioca — go directly into the deep freezer at -18°C.'
        },
        {
            category: 'expiry',
            q: 'What is the shelf life of a Prep D pack?',
            a: 'Unopened ready-to-cook vacuum packs stay fresh 4–5 days in normal refrigeration. Ready-to-eat salads are best within 2–3 days. Frozen vegetables keep for 9–12 months. Every pack is stamped with its exact packed-on and use-by date.'
        },
        {
            category: 'returns',
            q: 'What is your freshness guarantee?',
            a: 'If any pack falls short on arrival, send us a photo on WhatsApp at +91 88910 04474 within 12 hours and we will replace it or credit you in full — no questions asked.'
        },
        {
            category: 'cooking',
            q: 'Do I need to wash the vegetables again before cooking?',
            a: 'No. Every vegetable goes through a three-stage ozonated water wash in our prep room. They are clean, food-safe and ready to go from pack to pan.'
        },
        {
            category: 'cooking',
            q: 'Are any preservatives or artificial colourings added?',
            a: 'None. We use physical ozonated sanitisation, a mild natural vitamin C rinse to prevent browning on cut surfaces, and high-barrier oxygen-evacuated vacuum packaging. Nothing else.'
        }
    ];

    /* ─────────── nutrition & health ─────────── */

    var NUTRITION_FACTS = [
        {
            value: '94%',
            title: 'Live bioactive enzymes',
            desc: 'Ozone-sanitised cut vegetables retain 94% of their active cellular enzymes, against blanching or chemical preservation.'
        },
        {
            value: '3.8×',
            title: 'Vitamin C retention',
            desc: 'Oxygen-barrier pouches stop oxidative degradation, keeping ascorbic acid bioavailable for four to five days.'
        },
        {
            value: '6.2g',
            title: 'Fibre per cup',
            desc: 'High raw dietary fibre supports steady gut health and blunts blood glucose spikes after a meal.'
        },
        {
            value: '0%',
            title: 'Added sodium & sulphur',
            desc: 'We never use sodium metabisulfite, chlorine bleach or artificial shelf-life extenders.'
        }
    ];

    var EATING_TIPS = [
        'Aim for at least 400g of varied, colourful vegetables a day to cover the full micronutrient spectrum.',
        'Steam rather than deep-boil, so water-soluble vitamins B and C do not leach away.',
        'Pair leafy greens and microgreens with a healthy fat — cold-pressed coconut oil works — to absorb vitamins A, D, E and K.',
        'Eat sprouted moong or oats cups within 30 minutes of opening, while enzyme activity is at its peak.'
    ];

    var STORAGE_GUIDE = [
        {
            title: 'Ready-to-cook packs',
            temp: '0°C to 4°C, crisper',
            shelfLife: '4–5 days',
            rule: 'Keep in the original vacuum seal until you cook. If you use half, fold the pouch tight and clip it.'
        },
        {
            title: 'Ready-to-eat bowls & salads',
            temp: '2°C to 4°C, chilled shelf',
            shelfLife: '2–3 days',
            rule: 'Pour the dressing only right before eating, so the vegetables and sprouts stay crisp.'
        },
        {
            title: 'Frozen vegetables & cassava',
            temp: '-18°C, deep freezer',
            shelfLife: '9–12 months',
            rule: 'Do not thaw on the counter. Add straight from frozen into boiling water or a hot pan.'
        },
        {
            title: 'Living microgreens',
            temp: '2°C to 4°C, chilled',
            shelfLife: '6–7 days',
            rule: 'Keep inside the breathable clamshell and snip the greens right before you garnish.'
        }
    ];

    var DIETARY_GOALS = [
        {
            id: 'weight',
            title: 'Weight management',
            shortDesc: 'High-volume, high-fibre, low-calorie vegetable cuts.',
            recommendedPacks: ['Fine Shredded Thoran Mix', 'Sprouted Moong & Microgreen Bowl', 'Living Hydroponic Microgreen Trio'],
            dietitianTip:
                'Filling half the plate with raw or lightly steamed vegetables creates natural satiety while holding a main meal under about 150 kcal of caloric density.'
        },
        {
            id: 'diabetes',
            title: 'Blood sugar',
            shortDesc: 'Low glycemic index vegetables that avoid insulin spikes.',
            recommendedPacks: ['Everyday Mixed Veg Diced Tray', 'Kerala Sambar Vegetable Cuts', 'Himalayan Pink Salt Roasted Makhana'],
            dietitianTip:
                'The soluble fibre in drumstick, ladyfinger and beans slows glucose absorption in the intestinal tract, which steadies blood sugar after eating.'
        },
        {
            id: 'immunity',
            title: 'Immunity & gut',
            shortDesc: 'Antioxidants, live enzymes and raw vitamin C.',
            recommendedPacks: ['Raw Amla, Ginger & Turmeric Tonic', 'Living Hydroponic Microgreen Trio', 'Chilled Ozone-Rinsed Tender Coconut Pouch'],
            dietitianTip:
                'Hydroponic microgreens carry far higher concentrations of sulforaphane, carotenoids and live plant enzymes than the mature plant does.'
        },
        {
            id: 'heart',
            title: 'Heart & cholesterol',
            shortDesc: 'Potassium-rich, sodium-free, cold-prepped plant food.',
            recommendedPacks: ['Overnight Chia & Oats Protein Cup', 'Peeled Shallots & Garlic Duo', 'Raw Activated 7-Seed Power Mix'],
            dietitianTip:
                'Natural allicin in fresh peeled garlic, paired with the plant sterols in oats, supports lower LDL cholesterol and less arterial inflammation.'
        }
    ];

    var DAILY_ROUTINE = [
        {
            time: '7:30 AM',
            badge: 'Morning fuel',
            title: 'Nutrient-dense morning',
            packName: 'Overnight Chia Oats & Microgreens',
            description: 'Grab a cold-infused oats cup, or throw microgreens over your eggs or dosa in 30 seconds.',
            prepMinutes: 1,
            benefits: ['Sustained energy', 'Zero morning cooking', 'Rich in live enzymes']
        },
        {
            time: '12:45 PM',
            badge: 'Midday power',
            title: 'Speed lunch sadya',
            packName: 'Kerala Sambar Kit + Thoran Mix',
            description: 'Boil the dal, tip the Sambar pack into the pot, toss the shredded Thoran in coconut oil for four minutes.',
            prepMinutes: 10,
            benefits: ['No knife cleanup', 'High bioavailable fibre', 'Authentic Kerala taste']
        },
        {
            time: '4:30 PM',
            badge: 'Tea time',
            title: 'Clean evening refresh',
            packName: 'Raw Amla Tonic or Makhana Crunch',
            description: 'Skip the oily fried snack. Sip a chilled cold-pressed amla shot and crunch pink salt foxnuts.',
            prepMinutes: 0,
            benefits: ['Zero cholesterol', 'Rich in vitamin C', 'No post-snack slump']
        },
        {
            time: '8:00 PM',
            badge: 'Night nourish',
            title: 'Effortless gourmet dinner',
            packName: 'Chettinad Kurma Kit or Mixed Veg Tray',
            description: 'Toss diced vegetables into a quick stir-fry, or simmer the kurma with appam in twelve minutes.',
            prepMinutes: 12,
            benefits: ['Light on digestion', 'Even calibrated cooking', 'No smelly kitchen bin']
        }
    ];

    /* ─────────── b2b ─────────── */

    var BULK_SECTORS = [
        {
            name: 'Hotels & resorts',
            desc: 'Standardised vegetable cuts for buffet lines and banquet prep, with consistent food costs and no scrap loss.',
            ideal: 'Sambar kits · Aviyal cuts · Diced mixed veg · Peeled onions'
        },
        {
            name: 'Restaurants & cafes',
            desc: 'High-speed line prep that removes the morning knife station and speeds up table turnover.',
            ideal: 'Custom dice trays · Julienned stir-fry packs · IQF corn & peas'
        },
        {
            name: 'Caterers & event planners',
            desc: 'Sadya and wedding banquet kits, packed in 5kg and 10kg bulk vacuum crates for high-volume cooking.',
            ideal: 'Grand Aviyal kits · Sambar vegetable mixes · Peeled shallots'
        },
        {
            name: 'Supermarkets & hypermarkets',
            desc: 'Retail-ready barcode packaging with a clear anti-fog window and a verified five-day shelf life.',
            ideal: 'Retail trays · Microgreen clamshells · Protein oats cups'
        },
        {
            name: 'Corporate & tech parks',
            desc: 'Subsidised pantry packs, healthy breakfast fruit bowls and cold-pressed juice for employee wellness.',
            ideal: 'Overnight oats cups · Fruit medleys · Sprouted salads'
        }
    ];

    var DISTRIBUTOR_BENEFITS = [
        {
            title: 'Healthy dealer margins',
            desc: 'Attractive margins with a fast inventory cycle and high retail repeat rates.'
        },
        {
            title: 'Cold chain infrastructure',
            desc: 'Temperature-controlled transport support, insulated carry crates and branded retail chillers on qualifying volumes.'
        },
        {
            title: 'Marketing & POS support',
            desc: 'Branded display stands, in-store tasting kits and geo-targeted digital ads in your PIN code.'
        },
        {
            title: 'Exclusive territory rights',
            desc: 'Protected territory allocation across designated city zones or institutional vendor routes.'
        }
    ];

    var DISTRIBUTOR_REQUIREMENTS = [
        'An existing distribution network in FMCG, fresh produce, supermarket or institutional catering',
        'Commercial cold room or deep-freezer storage (0–4°C and -18°C)',
        'Valid FSSAI licence and GST registration',
        'Working capital to carry an opening stock cycle'
    ];

    /* ─────────── where we are ─────────── */

    var HUBS = [
        {
            name: 'Manjeri central hub',
            address: 'Industrial Estate, Manjeri, Malappuram',
            hours: '6:00 AM – 8:00 PM',
            note: '0.8 km from town'
        },
        {
            name: 'Calicut city hub',
            address: 'Mavoor Road / Arayidathupalam, Kozhikode',
            hours: '6:00 AM – 9:00 PM',
            note: '1.2 km from Palayam'
        },
        {
            name: 'Perinthalmanna express point',
            address: 'Hospital Road, Perinthalmanna',
            hours: '6:30 AM – 8:00 PM',
            note: '0.5 km from the bypass'
        },
        {
            name: 'Tirur coastal hub',
            address: 'Gulf Bazaar Road, Tirur',
            hours: '6:30 AM – 7:30 PM',
            note: '1.0 km from the station'
        },
        {
            name: 'Kottakkal wellness hub',
            address: 'Arya Vaidya Sala Junction, Kottakkal',
            hours: '6:30 AM – 8:00 PM',
            note: '0.4 km from AVS'
        }
    ];

    /* Localities we quote a slot for. Anything else routes to WhatsApp
       rather than guessing — a wrong yes here costs a real delivery. */
    var DELIVERY_AREAS = [
        { name: 'Manjeri', slot: 'Morning & evening' },
        { name: 'Malappuram town', slot: 'Morning & evening' },
        { name: 'Perinthalmanna', slot: 'Morning & evening' },
        { name: 'Tirur', slot: 'Morning' },
        { name: 'Kottakkal', slot: 'Morning & evening' },
        { name: 'Kozhikode', slot: 'Morning & evening' },
        { name: 'Calicut', slot: 'Morning & evening' },
        { name: 'Chevayur', slot: 'Morning & evening' },
        { name: 'Palayam', slot: 'Morning & evening' },
        { name: 'Mavoor Road', slot: 'Morning & evening' },
        { name: 'Feroke', slot: 'Morning' },
        { name: 'West Hill', slot: 'Morning' },
        { name: 'Medical College', slot: 'Morning & evening' }
    ];

    var DELIVERY_CITIES = [
        'Manjeri, Malappuram',
        'Malappuram town',
        'Perinthalmanna',
        'Tirur',
        'Kottakkal',
        'Calicut city / Kozhikode',
        'Chevayur / Medical College',
        'Palayam / Mavoor Road'
    ];

    var TIME_SLOTS = ['Morning (6:30 AM – 8:30 AM)', 'Evening (4:30 PM – 7:00 PM)'];

    var CONTACT = {
        phone: '+91 88910 04474',
        phoneHref: 'tel:+918891004474',
        email: 'official.prepd@gmail.com',
        hours: 'Monday to Sunday, 6:00 AM – 9:00 PM IST',
        headquarters: 'Prep D Central Processing Hub, Industrial Development Area, Manjeri, Malappuram, Kerala 676121',
        calicutHub: 'Prep D Cold Logistics Hub, Arayidathupalam, Kozhikode, Kerala 673004'
    };

    /* ─────────── the small print ─────────── */

    var LEGAL = {
        privacy: {
            title: 'Privacy policy',
            body: [
                'We collect only what we need to bring food to your door: your name, delivery address, phone number and the contents of your order.',
                'Orders placed through this site are handed to WhatsApp as a pre-written message. Nothing you type into the order form is stored on this website or sent anywhere else — it goes only to your own WhatsApp app, and from there to us.',
                'We do not sell, rent or share your contact details with third parties for marketing.',
                'Delivery records are kept for the period required to handle refunds, replacements and food-safety traceability, and are then deleted.',
                'To ask what we hold about you, or to have it removed, message us on WhatsApp or write to ' + 'official.prepd@gmail.com' + '.'
            ]
        },
        terms: {
            title: 'Terms of service',
            body: [
                'Prices shown are indicative retail prices and may change with season and market conditions. The price confirmed on WhatsApp at the time of ordering is the one that applies.',
                'Orders are confirmed once we reply on WhatsApp. Placing an order through this site is a request, not a completed sale.',
                'Delivery slots are best-effort and depend on the route. We will tell you if a slot cannot be met.',
                'Payment is on delivery, by UPI or cash, unless agreed otherwise in advance.',
                'Freshness guarantee: if a pack falls short on arrival, send a photo on WhatsApp within 12 hours of delivery and we will replace it or credit you in full.',
                'Because these are perishable fresh foods, we cannot accept returns of opened packs outside the freshness guarantee above.'
            ]
        }
    };

    return {
        WA: WA,
        wa: wa,
        CATEGORIES: CATEGORIES,
        PRODUCTS: PRODUCTS,
        unitPrice: unitPrice,
        RECIPES: RECIPES,
        REVIEWS: REVIEWS,
        POSTS: POSTS,
        OPENINGS: OPENINGS,
        FAQ_CATEGORIES: FAQ_CATEGORIES,
        FAQS: FAQS,
        NUTRITION_FACTS: NUTRITION_FACTS,
        EATING_TIPS: EATING_TIPS,
        STORAGE_GUIDE: STORAGE_GUIDE,
        DIETARY_GOALS: DIETARY_GOALS,
        DAILY_ROUTINE: DAILY_ROUTINE,
        BULK_SECTORS: BULK_SECTORS,
        DISTRIBUTOR_BENEFITS: DISTRIBUTOR_BENEFITS,
        DISTRIBUTOR_REQUIREMENTS: DISTRIBUTOR_REQUIREMENTS,
        HUBS: HUBS,
        DELIVERY_AREAS: DELIVERY_AREAS,
        DELIVERY_CITIES: DELIVERY_CITIES,
        TIME_SLOTS: TIME_SLOTS,
        CONTACT: CONTACT,
        LEGAL: LEGAL
    };
})();
