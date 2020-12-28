# Course Scheduler
University course web application developed with ReactJS. The UI is implemented with a multi-level, pan & zoom navigation model. Features include search filtering, ratings and recommendations, prerequisite checks, and more.

# Select Image Credits
Race Car Track: https://www.wndu.com/2020/08/21/roger-penske-to-indianapolis-500-fans-i-wanted-you-here/
Recommendation Background: https://www.sciencemag.org/careers/2018/07/recommendations-requesting-recommendations

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

