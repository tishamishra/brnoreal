-- Seed Agents Data
-- Note: id will be auto-generated as UUID

INSERT INTO agents (
  name, title, region, email, phone, specialties, bio
) VALUES
(
  'Tereza Králová',
  'Director of Prime Sales',
  'Brno & South Moravia',
  'tereza.kralova@brnore.cz',
  '+420 603 455 218',
  ARRAY['Historic villas', 'Luxury new builds', 'International buyers'],
  'A Brno native with architectural training, Tereza leads complex transactions across Masarykova čtvrť and Královo Pole for Czech and international clientele.'
),
(
  'Jakub Holomčík',
  'Investment Advisory Lead',
  'Brno-střed & Prague',
  'jakub.holomcik@brnore.cz',
  '+420 775 214 980',
  ARRAY['Mixed-use assets', 'City-centre portfolios', 'Yield optimisation'],
  'Jakub partners with private investors and family offices on income-generating assets surrounding Freedom Square and Prague''s Vinohrady.'
),
(
  'Ema Sedláčková',
  'Relocation & Lifestyle Specialist',
  'South Moravia & Vysočina',
  'ema.sedlackova@brnore.cz',
  '+420 602 714 563',
  ARRAY['Executive relocation', 'Schooling advisory', 'Rental-to-acquisition'],
  'Ema curates end-to-end relocation journeys for technology leaders and researchers moving to the Brno region, aligning lifestyle, education, and investment goals.'
)
ON CONFLICT DO NOTHING;

-- Seed Offices Data
-- Note: id will be auto-generated as UUID

INSERT INTO offices (
  name, region, address, phone, email, services
) VALUES
(
  'Brno-střed Flagship Gallery',
  'Brno',
  'Dominikánské náměstí 5, 602 00 Brno',
  '+420 539 012 310',
  'brno@brnore.cz',
  ARRAY['Prime sales brokerage', 'Marketing studio', 'Client concierge']
),
(
  'Královo Pole Advisory Lounge',
  'South Moravia',
  'Purkyňova 97a, 612 00 Brno',
  '+420 539 012 340',
  'kralovopole@brnore.cz',
  ARRAY['Investment advisory', 'Project marketing', 'Portfolio management']
),
(
  'Prague Consultancy Suite',
  'Prague',
  'Italská 32, 120 00 Praha 2',
  '+420 257 888 410',
  'prague@brnore.cz',
  ARRAY['Capital markets', 'Cross-border referrals', 'Legal & tax coordination']
)
ON CONFLICT DO NOTHING;

-- Verify the data was inserted
SELECT 'Agents inserted:' as info, COUNT(*) as count FROM agents
UNION ALL
SELECT 'Offices inserted:', COUNT(*) FROM offices;

