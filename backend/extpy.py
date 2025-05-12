import os

def extract_py_files(root_dir, output_file):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for foldername, subfolders, filenames in os.walk(root_dir):
            for filename in filenames:
                if filename.endswith('.py') and filename != os.path.basename(output_file):
                    file_path = os.path.join(foldername, filename)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(f"\n\n# ==== Begin: {file_path} ====\n")
                            outfile.write(infile.read())
                            outfile.write(f"\n# ==== End: {file_path} ====\n")
                    except Exception as e:
                        print(f"Could not read {file_path}: {e}")

# Example usage:
extract_py_files('/home/doflamingo/garpsec/backend', 'combined_output.py')

