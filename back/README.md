# test-image

This project Backend its build with node 20

## Enviroments

All enviroments are in the .env file for example DATABASE_HOST

# .env file

do you need create .env file with the following values

NODE_ENV="local"
WEB_HOST=
DATABASE_URL=
SUPABASE_URL=
SUPABASE_KEY=
PORT=

## Development server

Run ``npm run dev` for a dev server. `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.

## Python !important <<

Python processes, if you want to try locally please read the other README.md file. located it py-scripts/Process-Images/README.md


## Bonus Features
### Image Test API
This project includes a RESTful API to manage image analysis results and metadata.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/images` | Retrieves all image records from the database. |
| **POST** | `/images/analyze` | Processes a new image and saves the analysis results. |
| **DELETE** | `/images/:id` | Deletes a specific image record by its ID. |

---

### System Health
To ensure the backend is running correctly, you can use the status endpoint:

* **`GET /status`**: Verifies the application status and checks if the **MongoDB** connection is active.

**Example Response:**
```json
{
  "status": "ok",
  "dbReady": true,
  "version": "x.y.z"
}