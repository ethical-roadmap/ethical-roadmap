# Online Ethical Roadmap

## Project Structure




## Content Collections

### 1. Case Studies
Represents the case studies of the roadmap.

Found in the folder: ``_case_studies/english``

File structure: 
```
---
ref: cs1
lang: en
date: 2021-02-09T10:20:00Z
name: Name
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
documents:
    - filename.pdf
version: 1.0
---
```
The items in the field ``documents`` need to be placed in the folder ``assets/case_study_documents``.

### 2. Categories
Represents the roadmap categories.

Found in the folder: ``_categories/english``

File structure: 
```
---
ref: consent
lang: en
category: en
sequence: 5
color: "#cdcb36"
name: consent
image: >-
  filename.png
description: It is essential ...
text_content:
  - title: prompts & activities
    text: 
      - "Things to think about:"
      - How do you inform somebody about the project?
      - How often do you share how you will engage with them?
---
```

### 3. Glossary
Represents the words and definitions found in the glossary.

Found in the folder: ``_glossary/english``

File structure: 
```
---
category: ca
title: Accountability
definition: Taking personal responsibility for one’s conduct.
---
```
The ``category`` field needs to be the letter ``'c'`` followed by the first letter of the word.

### 4. Lenses Cards
Represents the lenses cards found in the Values category.

Found in the folder: ``_lenses/english``

File structure:
```
---
ref: design
lang: en
sequence: 4
name: design
---
```

### 5. Method Cards
Represents the method cards found in the Consent category.

Found in the folder: ``_methods_cards/english``

File structure:
```
---
ref: conversation
lang: en
sequence: 7
name: conversation
---
```

### 6. Moral Qualities Cards
Represents the moral qualities cards found in the Moral Qualities category.

Found in the folder: ``_moral_qualities/english``

File structure:
```
---
ref: 2
lang: en
front: loving listening
back: a commitment to giving participants the space/time...
---
```

### 7. Output Cards
Represents the output cards found in the Consent category.

Found in the folder: ``_output_cards/english``

File structure:
```
---
ref: conference
lang: en
sequence: 3
name: conference
---
```

### 8. Provocation Cards - Moral Qualities
Represents the provocation cards found in the Moral Qualities category.

Found in the folder: ``_provocation_cards/english``

File structure:
```
---
ref: 1
lang: en
front: what will integrity be in action?
---
```

### 9. Provocation Cards
Represents the provocation cards found in the Provocation category.

Found in the folder: ``_provocation_ds_cards/english``

File structure:
```
---
ref: 2
lang: en
category: technology
subcategory: "[provocations]"
text:
    - you have permission to use somebody's data after his death.
    - how long should you keep it?
---
```

### 10. Role Cards
Represents the role cards found in the Team Members category.

Found in the folder: ``_role_cards/english``

File structure:
```
---
ref: completer
lang: en
sequence: 1
name: completer / finisher
subname: (Organising tasks)
contribution:
    - Gets things done.
    - Turns the team’s ideas and concepts...
    - Pushes the team to make sure the work...
type: organising
---
```

### 11. Value Cards
Represents the value cards found in the Values category.

Found in the folder: ``_role_cards/english``

File structure:
```
---
ref: honesty
lang: en
sequence: 6
name: honesty
---
```

## Run Locally 
```
bundle exec jekyll serve --watch
```



