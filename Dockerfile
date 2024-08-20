

# Serve Application using Nginx Server
#FROM nginx:alpine

#COPY /dist/india-chat-boat/browser/ /usr/share/nginx/html
#EXPOSE 80
# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Copy the Angular build output to the Nginx HTML directory
COPY dist/chat-boat/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
