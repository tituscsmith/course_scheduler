# API
The API was protected by a VPN, but since the data is small, it has been reduced to local files:
completed.json and course_data.json.

```
[
    {
        "credits": <number of credits for the course>,
        "description": <course description>,
        "keywords": <1D list of string keywords>,
        "name": <course name>,
        "number": <unique course number>,
        "requisites": <2D list of course requisites>,
        "sections": [
            {
                "instructor": <instructor name>,
                "location": <section location>,
                "subsections": [
                    {
                        "location": <subsection location>,
                        "time": {
                            <weekday>: <time range>, ...
                        },
                        "number": <subsection number>
                    }
                ],
                "time": {
                <weekday>: <time range>, ...
                },
                "number": <section number>
            }, ...
        ],
        "subject": <course subject>
    }, ...
]
```

