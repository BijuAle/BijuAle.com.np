import os

file_path = "/Users/bijuale/GitHub/BijuAle.com.np/src/_includes/base.njk"

with open(file_path, "r") as f:
    content = f.read()

# Update mobile styles to keep everything on one line
mobile_inline_css = """
    @media (max-width: 600px) {
      body {
        padding: 0 0.8rem;
      }

      .header-top-row {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.2rem;
        padding: 0.8rem 0;
      }

      .logo-title-group {
        gap: 0.5rem;
        flex-shrink: 0;
      }

      .header-logo {
        height: 40px; /* Scaled down to fit row */
      }

      .web-heading {
        font-size: 1.2rem;
      }

      .bible-verse {
        text-align: right;
        font-size: 0.65rem;
        max-width: 130px; /* Prevent verse from pushing title too far */
        line-height: 1.1;
      }

      header nav a {
        padding: 0.2rem 0.4rem;
        font-size: 0.8rem;
      }
    }
"""

import re
content = re.sub(r'@media \(max-width: 600px\) \{.*?\}', mobile_inline_css, content, flags=re.DOTALL)

with open(file_path, "w") as f:
    f.write(content)

print("Mobile header forced to single line.")
