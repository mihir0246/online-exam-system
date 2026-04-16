import os

files = [
    'backend/services/testpaper.js',
    'backend/services/trainerFunctions.js'
]

targets = [
    ("if(req.user.type==='TRAINER'){", "if(req.user.type==='TRAINER' || req.user.type==='ADMIN'){"),
    ("if(req.user.type === 'TRAINER'){", "if(req.user.type === 'TRAINER' || req.user.type === 'ADMIN'){"),
    ("if(req.user.type===\"TRAINER\"){", "if(req.user.type===\"TRAINER\" || req.user.type==='ADMIN'){"),
    ("if(req.user.type === \"TRAINER\"){", "if(req.user.type === \"TRAINER\" || req.user.type === 'ADMIN'){"),
    ("if (req.user.type === 'TRAINER') {", "if (req.user.type === 'TRAINER' || req.user.type === 'ADMIN') {"),
    ("if(req.user.type==='TRAINER' || req.user.type==='ADMIN')", "if(req.user.type==='TRAINER' || req.user.type==='ADMIN')") # Avoid double replacement
]

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for old, new in targets:
            if new not in content: # Avoid double replacement
                 content = content.replace(old, new)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")
