import subprocess
from typing import Tuple

def validate_nmap_command(options: str) -> bool:
    """Basic validation of Nmap options"""
    forbidden = ['--script', '-iL']  # Add any dangerous options you want to block
    return not any(f in options for f in forbidden)

def run_nmap_scan(target: str, options: str = "-sV") -> Tuple[str, bool]:
    """Run Nmap scan and return (output, success)"""
    try:
        if not validate_nmap_command(options):
            return "Invalid Nmap options provided", False
            
        cmd = ["nmap", *options.split(), target]
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )
        
        if result.returncode != 0:
            return f"Error: {result.stderr}", False
            
        return result.stdout, True
        
    except subprocess.TimeoutExpired:
        return "Nmap scan timed out", False
    except Exception as e:
        return f"Error running Nmap: {str(e)}", False
