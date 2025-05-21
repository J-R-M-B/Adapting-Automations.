/*
  # Enhance newsletter templates with improved settings

  1. Changes
    - Update default settings for newsletter_templates
    - Add decorative elements support
    - Add background image support
    - Add article configuration options

  2. Security
    - Maintain existing RLS policies
*/

-- Update the default settings in the newsletter_templates table
ALTER TABLE newsletter_templates 
ALTER COLUMN settings SET DEFAULT '{
  "backgroundColor": "#ffffff",
  "textColor": "#000000",
  "accentColor": "#6366f1",
  "fontFamily": "Arial, sans-serif",
  "maxWidth": "600px",
  "borderRadius": "0.5rem",
  "spacing": "1rem",
  "backgroundImage": "",
  "decorativeElements": {
    "shapes": true,
    "backgrounds": true
  }
}'::jsonb;

-- Add a function to update existing templates with new default settings
CREATE OR REPLACE FUNCTION update_newsletter_templates_with_enhanced_settings()
RETURNS void AS $$
DECLARE
  template_record RECORD;
BEGIN
  FOR template_record IN SELECT id, settings FROM newsletter_templates
  LOOP
    -- Update with new settings if they don't exist
    UPDATE newsletter_templates
    SET settings = template_record.settings || 
      jsonb_build_object(
        'backgroundImage', COALESCE(template_record.settings->>'backgroundImage', ''),
        'decorativeElements', COALESCE(
          template_record.settings->'decorativeElements', 
          '{"shapes": true, "backgrounds": true}'::jsonb
        )
      )
    WHERE id = template_record.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Run the function to update existing templates
SELECT update_newsletter_templates_with_enhanced_settings();

-- Drop the function after use
DROP FUNCTION update_newsletter_templates_with_enhanced_settings();