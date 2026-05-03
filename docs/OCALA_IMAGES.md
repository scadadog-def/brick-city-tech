# Ocala Image Library

We keep a small, local image library for Brick City Tech pages.

## Location

- Original uploads: `public/ocala/`
- Optimized variants (recommended for use): `public/ocala/optimized/`

## Naming

Files are currently stored by upload id (`file_###---uuid...`). If we decide on specific hero/section images, we can rename them to stable semantic names (e.g. `downtown-square-1600.jpg`).

## Usage

Use the optimized variants in JSX like:

```jsx
<img src="/ocala/optimized/<filename>-1600.jpg" alt="..." loading="lazy" />
```

## Licensing / Permission

Per Hector: images are approved for use for Brick City Tech. Keep the permission screenshot in project records if needed.
