import subprocess
import xml.etree.ElementTree as ET

def execute_nmap_scan(command: str):
    try:
        # Security note: Validate command input
        allowed_flags = {'-sS', '-sV', '-O', '-p'}
        if not all(part in allowed_flags for part in command.split() if part.startswith('-')):
            raise ValueError("Invalid Nmap flags")
        
        result = subprocess.run(
            ["nmap"] + command.split(),
            capture_output=True,
            text=True,
            timeout=300
        )
        
        # Parse XML output
        return parse_nmap_xml(result.stdout)
    except Exception as e:
        return {"error": str(e)}
