| **Property**       | **CSS**                                | **Tailwind CSS**                                    |
|--------------------|----------------------------------------|-----------------------------------------------------|
| `height`           | `height: 400px;`                       | `style="height: 400px;"` or custom CSS class        |
| `width`            | `width: 300px;`                        | `style="width: 300px;"` or custom CSS class         |
| `background-color` | `background-color: black;`             | `bg-black`                                          |
| `border-radius`    | `border-radius: 10px;`                 | `rounded-lg`                                        |
| `padding`          | `padding: 30px;`                       | `p-8`                                               |
| `text-align`       | `text-align: center;`                  | `text-center`                                       |
| `margin`           | `margin: 0;` (for all elements)        | `m-0`                                               |
| `padding`          | `padding: 0;` (for all elements)       | `p-0`                                               |
| `box-sizing`       | `box-sizing: border-box;`              | `box-border` (applied globally in Tailwind base styles) |
| `font-family`      | `font-family: 'Franklin Gothic Medium';` | Custom CSS class, not directly in Tailwind           |
| `display`          | `display: flex;`                       | `flex`                                              |
| `justify-content`  | `justify-content: center;`             | `justify-center`                                    |
| `align-items`      | `align-items: center;`                 | `items-center`                                      |
| `background-color` | `background-color: cornflowerblue;`    | `bg-blue-500` (closest Tailwind color)              |
| `height`           | `height: 50%;`                         | `h-1/2`                                             |
| `width`            | `width: 100%;`                         | `w-full`                                            |
| `object-fit`       | `object-fit: cover;`                   | `object-cover`                                      |
| `object-position`  | `object-position: center;`             | `object-center`                                     |
| `color`            | `color: white;`                        | `text-white`                                        |
| `font-size`        | `font-size: 24px;`                     | `text-2xl`                                          |
| `margin`           | `margin: 10px 0;`                      | `my-2.5`                                            |
| `font-size`        | `font-size: 40px;`                     | `text-4xl`                                          |
| `font-size` (JS)   | `istatus.style.fontSize = "17px";`     | `istatus.style.fontSize = "text-xl";`               |
| `color` (JS)       | `istatus.style.color = "blue";`        | `istatus.style.color = "blue";` (same as CSS)       |
