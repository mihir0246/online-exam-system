import os

file_path = 'backend/services/testpaper.js'
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The issue was the role checks with double quotes, so we replace them precisely
    content = content.replace('if(req.user.type==="TRAINER"){', 'if(req.user.type==="TRAINER" || req.user.type==="ADMIN"){')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print('Updated roles in testpaper.js')
except Exception as e:
    print(f'Error: {e}')
