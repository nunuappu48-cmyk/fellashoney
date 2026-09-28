-- Fellas Honey - Realistic Seed Data
-- 1. SEED PRODUCTS
INSERT INTO public.products (
  id, name, slug, description, price, compare_price, weight, category, image_url, rating, stock, ingredients, benefits, storage_instructions, is_featured, is_active
) VALUES 
(
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4701',
  'Pure Wildflower Honey',
  'pure-wildflower-honey',
  'Harvested from pristine alpine meadows blooming with diverse seasonal wildflowers. Rich, floral, and amber with a delicate nectar balance.',
  24.99,
  29.99,
  '500g',
  'Wildflower',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
  4.95,
  120,
  '100% Pure Raw Wildflower Blossom Honey.',
  'Rich in natural pollen, enzymes, and antioxidants. Helps soothe seasonal allergies and boosts natural vitality.',
  'Store in a cool, dry place at room temperature (18°C - 24°C). Do not refrigerate. Crystallization is natural.',
  true,
  true
),
(
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4702',
  'Raw Organic Mountain Honey',
  'raw-organic-honey',
  'Certified 100% organic honey harvested straight from mountain apiaries. Unfiltered, unpasteurized, and full of live enzymes and pure aroma.',
  28.50,
  34.00,
  '500g',
  'Raw Honey',
  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
  4.98,
  85,
  '100% Certified Organic Raw Mountain Blossom Honey.',
  'Unheated and unpasteurized. Packed with active bee propolis and trace minerals for robust immunity.',
  'Keep sealed tightly away from direct sunlight. Never heat above 40°C to preserve active enzymes.',
  true,
  true
),
(
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4703',
  'Golden Acacia Honey',
  'acacia-honey',
  'Known for its crystal-clear golden hue and subtle, whisper-sweet vanilla notes. Very low glycemic index and slow to crystallize.',
  26.00,
  31.00,
  '500g',
  'Monofloral',
  'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
  4.88,
  95,
  '100% Pure Robinia Pseudoacacia Blossom Nectar.',
  'Gentle on the stomach, low sucrose content, promotes calm relaxation and aids digestion.',
  'Store at room temperature. Its high fructose ratio keeps it liquid for prolonged periods naturally.',
  true,
  true
),
(
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4704',
  'Royal Yemeni Sidr Honey',
  'sidr-honey',
  'The crown jewel of natural honeys. Sourced exclusively from ancient sacred Sidr (Lote) trees in remote valleys. Deep caramel notes with legendary healing potency.',
  68.00,
  79.00,
  '500g',
  'Rare Reserve',
  'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  5.00,
  40,
  '100% Unadulterated Pure Sidr (Ziziphus Spina-Christi) Honey.',
  'One of the world’s most potent therapeutic honeys. Superior antibacterial, antiviral, and wound-healing properties.',
  'Store in a dark, cool cupboard. Consume with a wooden or ceramic spoon.',
  true,
  true
),
(
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4705',
  'New Zealand Raw Manuka Honey (MGO 400+)',
  'manuka-honey',
  'Certified authentic Monofloral Manuka honey from New Zealand’s native Leptospermum scoparium tree. Rich, earthy, and robust.',
  54.00,
  62.00,
  '250g',
  'Medical Grade',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  4.96,
  60,
  '100% Pure New Zealand Manuka Honey (MGO 400+ / UMF 13+).',
  'Exceptional high Methylglyoxal content supporting digestive wellness, sore throat relief, and cellular repair.',
  'Store below 20°C. Do not expose to extreme heat or moisture.',
  true,
  true
),
(
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4706',
  'Black Forest Pine Honey',
  'forest-honey',
  'A deep, dark honeydew honey harvested from majestic pine and evergreen canopies. Rich in polyphenols, malty caramel, and resinous aroma.',
  29.00,
  35.00,
  '500g',
  'Honeydew',
  'https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=800&q=80',
  4.90,
  70,
  '100% Pure Dark Pine Tree Honeydew Honey.',
  'Exceptionally rich in essential minerals like potassium, magnesium, iron, and zinc.',
  'Keep in a dark, dry pantry at room temperature.',
  false,
  true
),
(
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4707',
  'Ceylon Cinnamon Infused Honey',
  'cinnamon-infused-honey',
  'Pure wildflower honey gently slow-infused for weeks with organic organic Ceylon (true) cinnamon bark. Warm, comforting, and wonderfully aromatic.',
  22.50,
  27.00,
  '350g',
  'Infused Honey',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  4.92,
  90,
  'Raw Wildflower Honey (97%), Organic Ceylon Cinnamon Extract & Ground Bark (3%).',
  'Regulates blood glucose balance, aids metabolic rate, and warms circulation.',
  'Store at room temperature. Stir before use if spice settles naturally.',
  true,
  true
),
(
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4708',
  'Wild Ginger & Turmeric Honey',
  'ginger-honey',
  'A zesty, invigorating fusion of raw golden honey infused with fresh organic ginger root and golden turmeric. Spicy warmth meets luscious sweetness.',
  23.00,
  28.00,
  '350g',
  'Infused Honey',
  'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
  4.87,
  80,
  'Raw Wildflower Honey (95%), Organic Cold-Pressed Ginger Root (3%), Organic Turmeric (2%).',
  'Powerful anti-inflammatory duo, eases digestion, clears sinuses, and fights winter chills.',
  'Store tightly capped in a dry, cool area.',
  false,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  stock = EXCLUDED.stock;

-- 2. SEED REVIEWS
INSERT INTO public.reviews (
  id, user_name, product_id, rating, comment, created_at
) VALUES
(
  'f1a8421c-3b7c-4820-b384-90a169b18001',
  'Eleanor Vance',
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4701',
  5,
  'The most authentic raw honey I have ever tasted! You can taste the wildflowers in every spoon. Shipping was super fast and the jar was packaged like a luxury perfume.',
  now() - interval '3 days'
),
(
  'f1a8421c-3b7c-4820-b384-90a169b18002',
  'Marcus Thorne',
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4704',
  5,
  'The Sidr Honey is incomparable. Thick, rich, and truly therapeutic. My morning sore throat disappeared after just two teaspoons. Fellas Honey is our household staple now.',
  now() - interval '6 days'
),
(
  'f1a8421c-3b7c-4820-b384-90a169b18003',
  'Sarah Jenkins',
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4707',
  5,
  'Ceylon Cinnamon honey in my morning oatmeal and green tea is absolute heaven! Sweet, spicy, and perfectly balanced. Ordering 3 more jars for holiday gifts.',
  now() - interval '12 days'
),
(
  'f1a8421c-3b7c-4820-b384-90a169b18004',
  'David Chen',
  'e2b7617c-17b5-4b06-a2cb-0c9f131a4702',
  5,
  '100% genuine raw honey. It retains that wonderful fine granulation and incredible floral scent. You can tell nothing is filtered out.',
  now() - interval '15 days'
)
ON CONFLICT (id) DO NOTHING;
