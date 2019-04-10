---
lang: en
---
{% assign categories=site.categories | where:"lang", page.lang %}
var categories = [
    {% for category in categories %}
      {% include search.json %}{% unless forloop.last %},{% endunless %}
    {% endfor %}
]