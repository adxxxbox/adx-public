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