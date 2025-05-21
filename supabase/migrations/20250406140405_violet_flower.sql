/*
  # Add decorative blocks to newsletter templates

  1. Changes
    - Update newsletter_templates table to support decorative blocks
    - Add default settings for shapes and decorative elements
    - Ensure backward compatibility with existing templates

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
  "decorativeElements": {
    "shapes": true,
    "backgrounds": true
  }
}'::jsonb;

-- Add a function to update existing templates with new default settings
CREATE OR REPLACE FUNCTION update_newsletter_templates_with_decorative_settings()
RETURNS void AS $$
DECLARE
  template_record RECORD;
BEGIN
  FOR template_record IN SELECT id, settings FROM newsletter_templates
  LOOP
    -- Only update if the decorativeElements key doesn't exist
    IF template_record.settings->>'decorativeElements' IS NULL THEN
      UPDATE newsletter_templates
      SET settings = template_record.settings || 
        '{"decorativeElements": {"shapes": true, "backgrounds": true}}'::jsonb
      WHERE id = template_record.id;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Run the function to update existing templates
SELECT update_newsletter_templates_with_decorative_settings();

-- Drop the function after use
DROP FUNCTION update_newsletter_templates_with_decorative_settings();