# Documentation
Below is a json array containing all the available arguments for the `silverBox` function, along with their types, default values, explanations, and nested configurations where applicable. See at the end of this document for usage instructions.

[
{"argument-name": "alertIcon", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Predefined icons including:  `success`, `error`, `warning`, `info`, `question`."},
{"argument-name": "animation", "TYPE": "object | array", "default_value": "no_default_value", "EXPLANATION": "Custom animation. It can ba an object or an array of objects.", "configs": [
  {"config": "animation.delay", "TYPE": "string | number", "default_value": "0ms", "EXPLANATION": "Animation delay in milliseconds or seconds."},
  {"config": "animation.direction", "TYPE": "string", "default_value": "normal", "EXPLANATION": "Animation direction."},
  {"config": "animation.duration", "TYPE": "string | number", "default_value": "300ms", "EXPLANATION": "Animation duration in milliseconds or seconds."},
  {"config": "animation.fillMode", "TYPE": "string", "default_value": "none", "EXPLANATION": "Animation fill mode."},
  {"config": "animation.iterationCount", "TYPE": "string | number", "default_value": "1", "EXPLANATION": "Animation iteration count."},
  {"config": "animation.name", "TYPE": "string", "default_value": "popUp", "EXPLANATION": "Animation name."},
  {"config": "animation.timingFunction", "TYPE": "string", "default_value": "1", "EXPLANATION": "Animation timing function."}]},
{"argument-name": "buttonsDirection", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button wrapper HTML direction."},
{"argument-name": "cancelButton", "TYPE": "object", "default_value": "no_default_value", "EXPLANATION": "Cancel button configuration", "configs": [
  {"config": "cancelButton.bgColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button background color."},
  {"config": "cancelButton.borderColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button border color."},
  {"config": "cancelButton.className", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button ClassName."},
  {"config": "cancelButton.closeOnClick", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Whether SilverBox closes on click or not."},
  {"config": "cancelButton.dataAttribute", "TYPE": "object", "default_value": "\" \"", "EXPLANATION": "Specify desired html attribute by passing an object with key-value pairs. For example:  `{ hashId:'10012', lastStatus:'failed' }` will generate `data-hashId='10012'` and `data-lastStatus='failed'` for the appropriate button.  "},
  {"config": "cancelButton.disabled", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Button disabled attribute."},
  {"config": "cancelButton.iconEnd", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button icon at the end."},
  {"config": "cancelButton.iconStart", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button icon at the start."},
  {"config": "cancelButton.id", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button ID."},
  {"config": "cancelButton.loadingAnimation", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Button loading animation on click."},
  {"config": "cancelButton.onClick", "TYPE": "function", "default_value": "\" \"", "EXPLANATION": "Function to run when button is clicked."},
  {"config": "cancelButton.showButton", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Show/Hide button."},
  {"config": "cancelButton.text", "TYPE": "string", "default_value": "\"Cancel\"", "EXPLANATION": "Button text."},
  {"config": "cancelButton.textColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button text color."}]},
{"argument-name": "centerContent", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Aligns the content center.  `true` or `false`."},
{"argument-name": "closeOnOverlayClick", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Determines whether the modal should be closed after the overlay click."},
{"argument-name": "confirmButton", "TYPE": "object", "default_value": "no_default_value", "EXPLANATION": "Confirm button configuration", "configs": [
  {"config": "confirmButton.bgColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button background color."},
  {"config": "confirmButton.borderColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button border color."},
  {"config": "confirmButton.className", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button ClassName."},
  {"config": "confirmButton.closeOnClick", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Whether SilverBox closes on click or not."},
  {"config": "confirmButton.dataAttribute", "TYPE": "object", "default_value": "\" \"", "EXPLANATION": "Specify desired html attribute by passing an object with key-value pairs. For example:  `{ hashId:'10012', lastStatus:'failed' }` will generate `data-hashId='10012'` and `data-lastStatus='failed'` for the appropriate button.  "},
  {"config": "confirmButton.disabled", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Button disabled attribute."},
  {"config": "confirmButton.iconEnd", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button icon at the end."},
  {"config": "confirmButton.iconStart", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button icon at the start."},
  {"config": "confirmButton.id", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button ID."},
  {"config": "confirmButton.loadingAnimation", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Button loading animation on click."},
  {"config": "confirmButton.onClick", "TYPE": "function", "default_value": "\" \"", "EXPLANATION": "Function to run when button is clicked."},
  {"config": "confirmButton.showButton", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Show/Hide button."},
  {"config": "confirmButton.text", "TYPE": "string", "default_value": "\"Confirm\"", "EXPLANATION": "Button text."},
  {"config": "confirmButton.textColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button text color."}]},
{"argument-name": "customButton", "TYPE": "object", "default_value": "no_default_value", "EXPLANATION": "Custom button configuration", "configs": [
  {"config": "customButton.bgColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button background color."},
  {"config": "customButton.borderColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button border color."},
  {"config": "customButton.className", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button ClassName."},
  {"config": "customButton.closeOnClick", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Whether SilverBox closes on click or not."},
  {"config": "customButton.dataAttribute", "TYPE": "object", "default_value": "\" \"", "EXPLANATION": "Specify desired html attribute by passing an object with key-value pairs. For example:  `{ hashId:'10012', lastStatus:'failed' }` will generate `data-hashId='10012'` and `data-lastStatus='failed'` for the appropriate button.  "},
  {"config": "customButton.disabled", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Button disabled attribute."},
  {"config": "customButton.iconEnd", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button icon at the end."},
  {"config": "customButton.iconStart", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button icon at the start."},
  {"config": "customButton.id", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button ID."},
  {"config": "customButton.loadingAnimation", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Button loading animation on click."},
  {"config": "customButton.onClick", "TYPE": "function", "default_value": "\" \"", "EXPLANATION": "Function to run when button is clicked."},
  {"config": "customButton.showButton", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Show/Hide button."},
  {"config": "customButton.text", "TYPE": "string", "default_value": "\"Custom\"", "EXPLANATION": "Button text."},
  {"config": "customButton.textColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button text color."}]},
{"argument-name": "customIcon", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Path to a customIcon. For example  `customIcon: path/to/icon;` ."},
{"argument-name": "customIconClassName", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom icon class name."},
{"argument-name": "customIconId", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom icon id."},
{"argument-name": "customSvgIcon", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom svg icon element. For example:  `&lt;svg&gt; (your svg config here) &lt;/svg&gt;`."},
{"argument-name": "customSvgIconClassName", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom svg icon element class name."},
{"argument-name": "customSvgIconId", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom svg icon element id."},
{"argument-name": "denyButton", "TYPE": "object", "default_value": "no_default_value", "EXPLANATION": "Deny button configuration", "configs": [
  {"config": "denyButton.bgColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button background color."},
  {"config": "denyButton.borderColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button border color."},
  {"config": "denyButton.className", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button ClassName."},
  {"config": "denyButton.closeOnClick", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Whether SilverBox closes on click or not."},
  {"config": "denyButton.dataAttribute", "TYPE": "object", "default_value": "\" \"", "EXPLANATION": "Specify desired html attribute by passing an object with key-value pairs. For example:  `{ hashId:'10012', lastStatus:'failed' }` will generate `data-hashId='10012'` and `data-lastStatus='failed'` for the appropriate button.  "},
  {"config": "denyButton.disabled", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Button disabled attribute."},
  {"config": "denyButton.iconEnd", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button icon at the end."},
  {"config": "denyButton.iconStart", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button icon at the start."},
  {"config": "denyButton.id", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button ID."},
  {"config": "denyButton.loadingAnimation", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Button loading animation on click."},
  {"config": "denyButton.onClick", "TYPE": "function", "default_value": "\" \"", "EXPLANATION": "Function to run when button is clicked."},
  {"config": "denyButton.showButton", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Show/Hide button."},
  {"config": "denyButton.text", "TYPE": "string", "default_value": "\"Deny\"", "EXPLANATION": "Button text."},
  {"config": "denyButton.textColor", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Button text color."}]},
{"argument-name": "didOpen", "TYPE": "function", "default_value": "\" \"", "EXPLANATION": "Function to run after silverBox is rendered."},
{"argument-name": "direction", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox HTML direction."},
{"argument-name": "footer", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "HTML as SilverBox footer."},
{"argument-name": "html", "TYPE": "string | HTMLElement", "default_value": "\" \"", "EXPLANATION": "HTML as SilverBox body. If  `text` parameter is given at the same time as `HTML` parameter, `text` will be ignored. examples: <a href='/recovery'>recover password</a> or `inputElement`"},
{"argument-name": "input", "TYPE": "object | array", "default_value": "no_default_value", "EXPLANATION": "Input configuration. Can be an  `object` or an `array` of `objects`.", "configs": [
  {"config": "input.className", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input class."},
  {"config": "input.fontSize", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input font size."},
  {"config": "input.height", "TYPE": "string", "default_value": "\"100%\"", "EXPLANATION": "Input height."},
  {"config": "input.hint", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input hint at the bottom."},
  {"config": "input.id", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input id."},
  {"config": "input.label", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input label."},
  {"config": "input.maxLength", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input maxlength attribute."},
  {"config": "input.multiplyBy", "TYPE": "number", "default_value": "1", "EXPLANATION": "Multiplies the input."},
  {"config": "input.name", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input name attribute."},
  {"config": "input.numberOnly", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Accept only numbers from user."},
  {"config": "input.placeHolder", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input place holder."},
  {"config": "input.placeHolderFontSize", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input placeHolder font size."},
  {"config": "input.readOnly", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Input readonly attribute."},
  {"config": "input.textAlign", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input text align."},
  {"config": "input.type", "TYPE": "string", "default_value": "\"text\"", "EXPLANATION": "Input type. It can be  `text`, `number`, `textarea`, ..."},
  {"config": "input.value", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Input value."},
  {"config": "input.width", "TYPE": "string", "default_value": "\"100%\"", "EXPLANATION": "Input width."}]},
{"argument-name": "onClose", "TYPE": "function", "default_value": "\" \"", "EXPLANATION": "Function to run when silverBox closes."},
{"argument-name": "position", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Position SilverBox in:  `top-right`, `top-center`, `top-left`, `bottom-right`, `bottom-center`, `bottom-left`."},
{"argument-name": "preOpen", "TYPE": "function", "default_value": "\" \"", "EXPLANATION": "Function to run before silverBox is rendered."},
{"argument-name": "removeLoading", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Remove button loading animations. It can take  `first`, `last`, `all`, `number of the SilverBox` (like `'1'`)."},
{"argument-name": "removeSilverBox", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Remove previous silverBoxes. It can take  `first`, `last`, `all`, `number of the SilverBox` (like `'1'`)."},
{"argument-name": "showCloseButton", "TYPE": "boolean", "default_value": "false", "EXPLANATION": "Shows a small 'x' on the top of SilverBox."},
{"argument-name": "silverBoxClassName", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom class name."},
{"argument-name": "silverBoxId", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom ID."},
{"argument-name": "text", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Text as SilverBox body. If  `text` parameter is given at the same time as `HTML` parameter, `text` will be ignored."},
{"argument-name": "theme", "TYPE": "string", "default_value": "\"light\"", "EXPLANATION": "Changes SilverBox theme. Predefined themes:  `light`, `dark`."},
{"argument-name": "timer", "TYPE": "number | string | object", "default_value": "no_default_value", "EXPLANATION": "Timer config to close silverBox after a given time. It can be treated as  `duration` if you do not need other configs. For example: `timer: 1000ms`  <br /> and <br /> `timer: { duration:'1000ms' , pauseOnHover: false} `", "configs": [
  {"config": "timer.duration", "TYPE": "number | string", "default_value": "0", "EXPLANATION": "Timer duration in milliseconds (300ms) or seconds (0.3s) to close silverBox. The default unit is  `ms` if no unit is provided."},
  {"config": "timer.pauseOnHover", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Pause timer when mouse hovers on SilverBox."},
  {"config": "timer.showBar", "TYPE": "boolean", "default_value": "true", "EXPLANATION": "Show timer bar bellow SilverBox."}]},
{"argument-name": "title", "TYPE": "string | object", "default_value": "no_default_value", "EXPLANATION": "SilverBox title. It can be a string or an object.", "configs": [
  {"config": "title.alertIcon", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Predefined title icons including:  `success`, `error`, `warning`, `info`, `question`."},
  {"config": "title.customIcon", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Path to a title custom icon. For example  `customIcon: path/to/icon;` ."},
  {"config": "title.customIconClassName", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox title custom icon class."},
  {"config": "title.customIconId", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox title custom icon id."},
  {"config": "title.customSvgIcon", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom svg icon element. For example:  `&lt;svg&gt; (your svg config here) &lt;/svg&gt;`."},
  {"config": "title.customSvgIconClassName", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom svg icon element class name."},
  {"config": "title.customSvgIconId", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "SilverBox custom svg icon element id."},
  {"config": "title.text", "TYPE": "string", "default_value": "\" \"", "EXPLANATION": "Title text"}]}
]


# How to use it

## 1. Include the SilverBox's files on the page

```html
<link rel="stylesheet" href="link to css" />
<script src="link to silverBox.min.js"></script>
```

In userscripts, use @require (for the js file) and @resource (for the css file) to include the files, as follows:

```javascript
// @require      https://raw.githubusercontent.com/adxxxbox/adx-public/refs/heads/main/functions/silverBox/silverBox.min.js
// @resource     SILVERBOX_CSS https://raw.githubusercontent.com/adxxxbox/adx-public/refs/heads/main/functions/silverBox/silverBox.min.css
```

## 2. Create a basic alert popup using the silverBox method

```javascript
const myModal = silverBox({
  text: "This Is A Basic Alert Popup."
})
```

## 3. Customize the SilverBox using the following options

```javascript
const myModal = silverBox({
  // success, error, warning, info, question
  alertIcon: "",
  // config animations
  animation: {
    delay: 0,
    direction: 'normal',
    duration: .3,
    fillMode: 'none',
    iterationCount: 1,
    name: 'popUp',
    timingFunction: 1, // Animation timing function.
  }
  // direction of buttons
  buttonsDirection: "",
  // config the Cancel button
  cancelButton: {
    bgColor: "",
    borderColor: "",
    className: "",
    closeOnClick: false,
    dataAttribute: : "",
    disabled: false,
    iconEnd: "",
    iconStart: "",
    id: "",
    loadingAnimation: true,
    onClick: null,
    showButton: true,
    text: "Cancel",
    textColor: "",
  }
  // config the Confirm button
  confirmButton: {
    bgColor: "",
    borderColor: "",
    className: "",
    closeOnClick: false,
    dataAttribute: : "",
    disabled: false,
    iconEnd: "",
    iconStart: "",
    id: "",
    loadingAnimation: true,
    onClick: null,
    showButton: true,
    text: "Cancel",
    textColor: "",
  },
  // center your content or not
  centerContent: false,
  // determine if closing on the overlay should close the silverBox modal
  closeOnOverlayClick: true,
  // custom buttons
  customButton: {
    bgColor: "",
    borderColor: "",
    className: "",
    closeOnClick: false,
    dataAttribute: : "",
    disabled: false,
    iconEnd: "",
    iconStart: "",
    id: "",
    loadingAnimation: true,
    onClick: null,
    showButton: true,
    text: "Custom",
    textColor: "",
  }
  // custom icon here
  customIcon: "",
  customIconClassName: "",
  customIconId: "",
  customSvgIcon: "",
  customSvgIconClassName: "",
  customSvgIconId: "",
  // config the Deny button
  denyButton: {
    bgColor: "",
    borderColor: "",
    className: "",
    closeOnClick: false,
    dataAttribute: : "",
    disabled: false,
    iconEnd: "",
    iconStart: "",
    id: "",
    loadingAnimation: true,
    onClick: null,
    showButton: true,
    text: "Cancel",
    textColor: "",
  },
  // HTML direction
  direction: "",
  // run after silverBox is rendered.
  didOpen: () => { // Do something here },
  // footer content
  footer: "",
  // html content
  html: "",
  // config the input in prompt dialog
  input: {
    className: "",
    fontSize: "",
    height: "100%",
    hint: "",
    id: "",
    label: "",
    maxLength: "",
    multiplyBy: 1,
    name: "",
    numberOnly: false,
    placeHolder: "",
    placeHolderFontSize: "",
    readOnly: false,
    textAlign: "",
    type: "text", // text, number, textarea, etc
    value: "",
    width: "100%", 
  },
  // onClose function
  onClose: null,
  position: "", // top-right, top-center, top-left, bottom-right, bottom-center, bottom-left.
  preOpen: () => { // Do something here },
  removeLoading: "", // remove button loading animations. It can take first, last, all, number of the SilverBox (like '1').
  removeSilverBox: "", // first, last, all, number of the SilverBox (like '1').
  showCloseButton: false,
  silverBoxClassName: "",
  silverBoxId: "",
  text: "",
  theme: "light", // or "dark"
  timer: {
    duration: 0,
    pauseOnHover: true,
    showBar: true,
  }
  // customize the title
  title: {
    alertIcon: "",
    customIcon: "",
    customIconClassName: "",
    customIconId: "",
    customSvgIcon: "",
    customSvgIconClassName: "",
    customSvgIconId: "",
    text: "",
  }
})
```

## 4. API methods

```javascript
// Remove silverBox
myModal.remove();
// Remove button(s) loading animation
myModal.removeLoading();
```