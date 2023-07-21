# Gallery Lib with App Router

### Get Started
Requires **NextJS 13**

```bash
npm install react-image-gallery
```
Import the package with styles (without loading the styles the library might cause errors)

```javascript
import { Modal } from "gallery-with-magnifier";
import "gallery-with-magnifier/styles.css"
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

Add these media queries in tailwind.config.js
```
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

# Props
* `images`: (required) Array of objects
  * Available Properties:
    * `id`: ***number** 
    * `status`: Object (optional) 
      - `status: {msg: "fair", type: "fair"},`
    * `image`: ***string**
* `onClose`: (required) Void, A void for handling CloseEvents
* `zoomIn`: (optional) Boolean, To toggle Magnifying Glass
    * `defaultValue`: false
* `currentImage`: Number, Id of an image from the **Images** Array
