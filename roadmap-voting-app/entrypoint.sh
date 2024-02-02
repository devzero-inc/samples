#!/bin/sh

# Wait for the Docker daemon to start
echo "Waiting for the Docker daemon to start..."
while ! docker info >/dev/null 2>&1; do
    sleep 1
done
echo "Docker daemon is up and running!"

# Your existing commands to start Supabase or other services
npx supabase start -x imgproxy,migra,studio,edge-runtime,logflare,vector,pgbouncer > start.txt

echo "NEXT_PUBLIC_SUPABASE_URL=$(awk '/API URL:/ {print $3}' start.txt)" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$(awk '/anon key:/ {print $3}' start.txt)" >> .env.local

cat /app/start.txt
cat /app/.env.local

# Finally, start your application
exec npm run startapp


# npx supabase start -x storage-api,imgproxy,pgadmin-schema-diff,migra,postgres-meta,studio,edge-runtime,logflare,vector,pgbouncer > start.txt

# echo "NEXT_PUBLIC_SUPABASE_URL=$(awk '/API URL:/ {print $3}' start.txt)" > .env.local
# echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$(awk '/anon key:/ {print $3}' start.txt)" >> .env.local

# cat /app/start.txt
# cat /app/.env.local

# exec npm run startapp
