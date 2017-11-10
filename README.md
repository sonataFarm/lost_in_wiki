# Lost in Wiki
__Lost in Wiki__ is a game developed collaboratively by [Marlene Flores](https://github.com/floresm), [John Hartman](https://github.com/johnfdhartman) and [Nate Festinger](https://github.com/sonataFarm). In it, Wikipedia articles are represented as stars in a 3D starfield; users must navigate to a destination page, traversing via page links.   


## Technologies
Lost in Wiki utilizes a __Rails__ backend and __PostgreSQL__ database to serve API calls to a __React/Redux__ frontend. All 3D rendering and animation is accomplished using the __Three.js__ library. 

This design results in a robust and optimized backend; performant and compelling 3D rendering; and an immersive user experience.

## Key Features
* Implements pagerank algorithm to order articles for a compelling gaming experience
* Combines Three.js with React/Redux, using class extensions of Three.js objects to achieve a modular and DRY design
* Integrates wiki.js API with custom requests, fetching only necessary data to ensure minimal bandwidth usage
