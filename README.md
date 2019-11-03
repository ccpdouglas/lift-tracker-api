# lift-tracker-api
## API to track lifts and lift progress across time

```
POST /exercise
```
Creates an exercise
```
GET /exercise/{id}
```
Gets an exercise
```
PATCH /exercise/{id}
```
Updates an exercise
```
DELETE /exercise/{id}
```
Deletes an exercise
```
POST /exercise/{id}/set
```
Creates a set 
```
GET /exercise/{id}/set/{set_id}
```
Gets a set
```
PATCH /exercise/{id}/set/{set_id}
```
Updates a set
```
DELETE /exercise/{id}/set/{set_id}
```
Deletes a set
```
GET /exercise/{id}/report/{report_type}
```
Gets a report with past year of lifts
y-axis is either one rep max calculation or weight lifted across set

