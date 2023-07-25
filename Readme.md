## Demo Image

![](https://ik.imagekit.io/killuaaog/ComponentsDemo/DigitsInput?updatedAt=1690297366608)

## Installation

### Latest version

v1.0.2

#### if you have react-native-vector-icons installed in your project

```bash
yarn add react-native-digits-input
```

or with npm

```bash
npm install react-native-digits-input --save
```

## Usage

### import Component

```javascript
import DigitsInput from 'react-native-digits-input';
```

### Basic Usage

```javascript
<DigitsInput numberOfDigits={6} onCodeChange={(text) => console.log(text)} />
```

## Props

| Name                     | Type                       | Default |
| ------------------------ | -------------------------- | :-----: |
| **numberOfDigits**       | `number`                   |    4    |
| **onCodeChange**         | `* function (value)=>void` |  none   |
| **disabled**             | `boolean`                  |  false  |
| **numberContainerStyle** | `View Style`               |  none   |
| **containerStyle**       | `View Style`               |  none   |
