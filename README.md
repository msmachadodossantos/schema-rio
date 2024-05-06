# schema-rio

This is a JavaScript library designed for data transformation on the client-side,
tailored to accommodate custom formats specified via data attributes on HTML input text elements.

It helps developers define and enforce structured data formats directly within HTML markup.

## Examples

```html
<!-- Pattern for mobile phone numbers in Portugal. -->
<input
  type="text"
  data-schema-rio="+999 999 999 999"
/>

<!-- Pattern for telephone numbers in Tokyo. -->
<input
  type="text"
  data-schema-rio="+99 (99) 9999-9999"
/>

<!-- The pattern for a license plate in Portugal: AB-12-CD -->
<input
  type="text"
  data-schema-rio="aa-99-aa"
/>
```
