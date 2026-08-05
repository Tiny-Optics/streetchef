#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-/opt/streetchef/backend/.env}"

set_env_value() {
  local key="$1"
  local value="$2"

  python3 - "$ENV_FILE" "$key" "$value" <<'PY'
from pathlib import Path
import sys

env_path = Path(sys.argv[1])
key = sys.argv[2]
value = sys.argv[3]

lines = env_path.read_text().splitlines() if env_path.exists() else []
updated = []
replaced = False
for line in lines:
    if line.startswith(f"{key}="):
        updated.append(f"{key}={value}")
        replaced = True
    else:
        updated.append(line)

if not replaced:
    updated.append(f"{key}={value}")

env_path.write_text("\n".join(updated) + "\n")
PY
}

set_env_value "BETTER_AUTH_URL" "https://app.streetchef.co.za/api/auth"
set_env_value "FRONTEND_URL" "https://app.streetchef.co.za"
