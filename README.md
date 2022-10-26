# gsheet-github-translation
Manage translation file from Google Sheet

### Overview
This document describes the idea of this tool and how to use it.

### Problem Statement
meniaga apps is using manual localization methods by translating all the string keys to their respective languages. All these keys are kept in the JSON files (en.json, my.json etc). This method has some disadvantages;

- Hard to maintain as only developers have access to this file.
- Every change made by UX Writers / Product Managers needs to be implemented manually by the developers.
- There’s no one source of truth between developers and UX Writers / Product Managers

### Solutions
The idea of this tool is to create an accessible document that can be used to update the JSON file in the code.

### Description
1. All translation keys will be stored in the protected sheet document
2. Every change made in the document will be recorded.
3. An update action will convert the document to JSON files and create a pull request on the code.
4. Developers will review the pull request and merge the changes and push it to production.

