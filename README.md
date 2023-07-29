# Gallery Lib with App Router

### Get Started
Requires **NextJS 13**

```bash
npm install react-image-gallery
```
Import the package, If the project doesnt have tailwindCSS installed import the styles as well

```javascript
import { Modal } from "gallery-with-magnifier";
import "gallery-with-magnifier/styles.css" // Optional
```

### Example Usage
```javascript
"use client"
import { useState } from "react"
import { Modal } from "gallery-with-magnifier"
import data from "./mock,ts"

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="flex flex-row w-full h-[540px] gap-3 relative">
      <div className="flex flex-col w-full h-full">
        <span onClick={() => {
          setCurrentSlide(4);
          setOpenModal(true);
        }}>Open Modal</span>
      </div>
      
      {openModal && (
        <Modal 
          currentImage={currentSlide}
          images={data}
          onClose={() => {setOpenModal(false)}}
          zoomIn={false}
        />
      )}
    </div>
  );
}
```

Update the next.config.js of your project with
```bash
/** @type {import('next').NextConfig} */

const nextConfig = {
  ...
  transpilePackages: ["gallery-with-magnifier"]
}
  
module.exports = nextConfig
```

Add these media queries and reference the library path in tailwind.config.js
```
content: [
  ...
  './node_modules/gallery-with-magnifier/**/*.{html,js,ts,tsx}'
],
...
extend: {
  screens: {
    '2xl': '1400px',
    narrow: { raw: '(max-aspect-ratio: 3 / 2)' },
    wide: { raw: '(min-aspect-ratio: 3 / 2)' },
    'taller-than-854': { raw: '(min-height: 854px)' },
    short: { raw: '(max-height: 800px)' },
    medium: { raw: '(max-height: 1000px)' },
  },
},
```

### Toggle Switch Component
* toggleHandler: (required) Void

```javascript
<ToggleSwitchMagnify toggleHandler={handleMag} />

...

const [showMag, setShowMag] = useState(false);

const handleMag = () => {
  setShowMag(!showMag);
  console.log("now set to", showMag) // testing
}
```

# Props
* `images`: (required) Array of objects
  * Available Properties:
    * `id`: ***number** 
    * `status`: (optional) Object      
      - `status: {
          msg: "fair" (the badges render the color based on the text of this value), 
          type: optional (string)
        },`
        - if the value of message is different than the type, then there are 4 type badges that can be added instead
          `type: [default, warning, success, error]`
    * `image`: ***string**
* `onClose`: (required) Void, A void for handling CloseEvents
* `zoomIn`: (optional) Boolean, To toggle Magnifying Glass
    * `defaultValue`: false
* `currentImage`: Number, Id of an image from the **Images** Array
