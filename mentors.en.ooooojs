---
lang: en
---
{% assign mentors=site.mentors | where:"lang", page.lang %}
var mentors = [
    {% for mentor in mentors %}
      {% include search.json %}{% unless forloop.last %},{% endunless %}
    {% endfor %}
]