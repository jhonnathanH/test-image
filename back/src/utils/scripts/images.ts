import { spawn } from 'child_process';
import path from 'path';


const handleProcess = async (imageUrl: string) => {
    try {
        console.log("Ejecutando script de Python para procesar la imagen...");
        const pythonFolder = path.join(__dirname, '../../../py-scripts/Process-Images');

        const pythonExe = process.env.NODE_ENV === 'production'
            ? 'python3'
            : path.join(__dirname, '../../../py-scripts/Process-Images/.venv/bin/python');

        const scriptPath = path.join(pythonFolder, 'process.py');
        console.log("RUTA PYTHON EXE:", pythonExe); // DEBUG
        console.log("RUTA SCRIPT PYTHON:", scriptPath); // DEBUG
        const pythonProcess = spawn(pythonExe, [scriptPath, imageUrl]);

        let resultData = "";
        let errorData = "";

        // collect data from script
        pythonProcess.stdout.on('data', (data) => {
            resultData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorData += data.toString();
        });

        return new Promise((resolve, reject) => {
            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    try {
                        const parsedResult = JSON.parse(resultData);
                        resolve(parsedResult);
                    } catch (e) {
                        reject(new Error("Python error without valid data " + resultData));
                    }
                } else {
                    reject(new Error(`Python Error (Code ${code}): ${errorData}`));
                }
            });
        });

    } catch (error) {
        console.error("Error Python:", error);
        throw error;
    }
};


export default handleProcess;