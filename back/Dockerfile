# Stage 1: Build the Node.js application
FROM node:20-slim
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Stage 2: Install dependencies and copy source code
COPY package*.json ./
RUN npm install

COPY py-scripts/Process-Images/requirements.txt ./py-scripts/Process-Images/
RUN pip3 install --no-cache-dir opencv-python-headless numpy requests --break-system-packages
RUN python3 -m venv /app/py-scripts/Process-Images/.venv
RUN /app/py-scripts/Process-Images/.venv/bin/pip install --no-cache-dir -r /app/py-scripts/Process-Images/requirements.txt

COPY . .

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "run", "dev"]