Param(
  [Parameter(Mandatory=$true)][string]$SupabaseProjectUrl,
  [Parameter(Mandatory=$true)][string]$AnonKey,
  [Parameter(Mandatory=$false)][string]$ServiceRoleKey,
  [Parameter(Mandatory=$false)][string]$BucketName = "images"
)

Write-Host "Writing .env.local"
$envContent = @()
$envContent += "NEXT_PUBLIC_SUPABASE_URL=$SupabaseProjectUrl"
$envContent += "NEXT_PUBLIC_SUPABASE_ANON_KEY=$AnonKey"
if ($ServiceRoleKey) { $envContent += "SUPABASE_SERVICE_ROLE_KEY=$ServiceRoleKey" }
$envContent += "NEXT_PUBLIC_SUPABASE_BUCKET=$BucketName"
Set-Content -Path ".env.local" -Value ($envContent -join "`n")

Write-Host "Apply SQL migration using Supabase SQL editor manually if CLI not configured." -ForegroundColor Yellow
Write-Host "Open: $SupabaseProjectUrl (Project -> SQL editor) and paste supabase/migrations/0001_init.sql" -ForegroundColor Yellow

Write-Host "If you have supabase CLI, run:" -ForegroundColor Cyan
Write-Host "supabase db push" -ForegroundColor Cyan

Write-Host "Create public storage bucket ($BucketName) via UI: Storage -> New bucket -> Public" -ForegroundColor Yellow

Write-Host "Done. Next: pnpm i && pnpm dev" -ForegroundColor Green


