CONTAINER_NAME := ghcr.io/kostyay/ci-demo:latest

.PHONY: build dev container deploy

build:
	echo "Building the application..."
	npm run build

dev:
	echo "Starting the development server..."
	npm run dev

container: build
	echo "Building the container..."
	docker build -t $(CONTAINER_NAME) .

deploy: container
	echo "Pushing the container to the registry..."
	docker push $(CONTAINER_NAME)
