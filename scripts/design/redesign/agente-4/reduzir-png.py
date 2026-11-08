# Agente 4 (redesign): reduz as 8 folhas dos esboços para caber em 300 kB cada (paleta de 64 tons; os esboços são cinzas).
# Uso, depois do esbocos.spec.ts: python3 -I scripts/design/redesign/agente-4/reduzir-png.py
import glob, os
from PIL import Image
for p in sorted(glob.glob('docs/revisoes/redesign/img/agente-4-*.png')):
    im = Image.open(p).convert('RGB').quantize(colors=64, method=Image.Quantize.MEDIANCUT)
    im.save(p, optimize=True)
    print(p, round(os.path.getsize(p) / 1024), 'kB')
