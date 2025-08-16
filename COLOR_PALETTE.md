# Velora Shop Color Palette

This project uses a custom color palette with dedicated CSS classes that complement Bootstrap's default colors. The palette is designed to be attractive and cohesive across all components.

## Color Variables

### Primary Colors
- **Primary**: `#7ADAA5` (Light Green) - Main brand color
- **Primary Light**: `#9EE4C1` - Lighter variation
- **Primary Dark**: `#5BCA8A` - Darker variation

### Secondary Colors
- **Secondary**: `#239BA7` (Teal) - Secondary brand color
- **Secondary Light**: `#2BB3C0` - Lighter variation
- **Secondary Dark**: `#1A7A85` - Darker variation

### Accent Colors
- **Accent**: `#ECECBB` (Light Cream) - Background and subtle elements
- **Accent Light**: `#F2F2D1` - Lighter variation
- **Accent Dark**: `#D9D9A8` - Darker variation

### Success/CTA Colors
- **Success**: `#E1AA36` (Earthy Orange) - Call-to-action and success states
- **Success Light**: `#E8B95A` - Lighter variation
- **Success Dark**: `#D1942A` - Darker variation

## Usage

### Custom Background Classes
- `bg-velora-primary` → Light Green (#7ADAA5)
- `bg-velora-secondary` → Teal (#239BA7)
- `bg-velora-accent` → Light Cream (#ECECBB)
- `bg-velora-success` → Earthy Orange (#E1AA36)

### Custom Button Classes
- `btn-velora-primary` → Light Green buttons
- `btn-velora-secondary` → Teal buttons
- `btn-velora-accent` → Cream buttons
- `btn-velora-success` → Orange buttons

### Custom Text Classes
- `text-velora-primary` → Light Green text
- `text-velora-secondary` → Teal text
- `text-velora-accent` → Cream text
- `text-velora-success` → Orange text

### Additional Utility Classes
- `bg-velora-primary-light`, `bg-velora-secondary-light`, `bg-velora-accent-light`, `bg-velora-success-light`
- `text-velora-primary-light`, `text-velora-secondary-light`, `text-velora-accent-light`, `text-velora-success-light`
- `border-velora-primary`, `border-velora-secondary`, `border-velora-accent`, `border-velora-success`

### CSS Variables
You can also use CSS variables directly:

```css
.my-custom-element {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: 1px solid var(--success-color);
}
```

## Component Updates

The following components have been updated to use the new color scheme:

1. **Navbar** - Uses `bg-velora-primary` and custom button classes
2. **User/Admin Layouts** - Header uses `bg-velora-secondary`
3. **Auth Pages** - Background uses `bg-velora-accent`
4. **Star Ratings** - Use `var(--success-color)` for consistency
5. **All Buttons** - Updated to use appropriate `btn-velora-*` classes
6. **Form Elements** - Focus states use primary color variables
7. **Cards and Tables** - Can use custom border classes

## Color Psychology

- **Light Green (#7ADAA5)**: Represents growth, freshness, and positivity - perfect for a shopping platform
- **Teal (#239BA7)**: Conveys trust, professionalism, and stability
- **Light Cream (#ECECBB)**: Provides warmth and approachability
- **Earthy Orange (#E1AA36)**: Encourages action and creates urgency for CTAs

## Benefits of Custom Classes

- **No Bootstrap Conflicts**: Custom classes don't override Bootstrap's default colors
- **Flexibility**: Can use both Bootstrap defaults and custom colors as needed
- **Maintainability**: Clear naming convention makes it easy to understand and maintain
- **Scalability**: Easy to add new color variations or modify existing ones

This color combination creates a modern, trustworthy, and engaging shopping experience while maintaining compatibility with Bootstrap's default styling system. 