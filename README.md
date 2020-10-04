# Medreport Demo

# Features

## Main Page

![main](https://user-images.githubusercontent.com/3698091/95008828-3041bc80-05eb-11eb-8790-e9774d0d320f.png)

- List of reports in table form with search bar
- List highlights first sentence of report
- Click on report name to view details of report
- Tags for the report are shown at the end of the report text

## Report Details Page

![image](https://user-images.githubusercontent.com/3698091/95009117-7435c100-05ed-11eb-82a2-5af11066cfde.png)

- Navigation to previous / next report based on search query. Navigation button disabled if first or last report in search results appropriately.
- Click on unused tag or drag unused tag to report area to add tag to report
- Click on active tag to make it inactive, click on inactive tag to make it active
- Drag a report's tag (active or inactive) to the unused tags panel to remove tag from report
- Unused tags panel is hidden when viewing on mobile or smaller screen

# How to Run

1. Clone the repo and navigate to the root directory

2. Run the following command to create the docker image and run it

```
$ make build && make run
```

3. Navigate to the following URL: http://localhost:5000
