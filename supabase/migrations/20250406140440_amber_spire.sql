/*
  # Update newsletter templates default settings

  1. Changes
    - Set default settings for newsletter templates
    - Add background color, text color, accent color, font family, and other styling defaults
    - Ensure proper formatting for JSON default values
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
  "spacing": "1rem"
}'::jsonb;