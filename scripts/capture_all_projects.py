#!/usr/bin/env python3
"""
Capture screenshots for all projects and save them in their respective folders
"""
import os
import subprocess
import sys
from pathlib import Path

# Import projects data
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../src/lib/data'))

# Projects data (copy from projects.ts)
projects = [
    {'slug': 'monster-fairings', 'url': 'https://monsterfairings.com'},
    {'slug': 'firmable', 'url': 'https://firmable.com/'},
    {'slug': 'gisteo', 'url': 'https://gisteo.com/'},
    {'slug': 'navjot-kaur-pllc', 'url': 'https://navjotkaurpllc.us/'},
    {'slug': 'hilink-travel-platform', 'url': 'https://travel-ui-ux-three.vercel.app/'},
    {'slug': 'simpletalk-ai', 'url': 'https://www.simpletalk.ai'},
    {'slug': 'convertbankstatement', 'url': 'https://www.convertbankstatement.io/'},
    {'slug': 'lineleader', 'url': 'https://lineleader.com/'},
    {'slug': 'allbirds', 'url': 'https://www.allbirds.com/'},
    {'slug': '260-sample-sale', 'url': 'https://260samplesale.com'},
    {'slug': 'karen-lazar-design', 'url': 'https://karenlazardesign.com'},
    {'slug': 'indigenous-treats', 'url': 'https://indigenoustreats.ca'},
    {'slug': 'b2-hookah', 'url': 'https://b2hookah.com'},
    {'slug': 'aimusicservice', 'url': 'https://aimusicservice.com/'},
    {'slug': 'guard-dog-security', 'url': 'https://guarddog-security.com/'},
    {'slug': 'havalink', 'url': 'https://www.havalink.com/'},
    {'slug': 'honey-by-kait', 'url': 'https://honeybykait.com/'},
    {'slug': 'rea-power', 'url': 'https://reapower.com.au/'},
    {'slug': 'thecodewiz', 'url': 'https://thecodewiz.com'},
    {'slug': 'howdo', 'url': 'https://howdo.com/'},
    {'slug': 'podologie-praxis-zug', 'url': 'https://podologiepraxiszug.ch/en/'},
    {'slug': 'mirai-homes', 'url': 'https://www.mirai-homes.eco/'},
    {'slug': 'meintrade', 'url': 'https://www.meintrade.ch/'},
    {'slug': 'dave-holloway', 'url': 'https://daveholloway.uk'},
    {'slug': 'oona-home', 'url': 'https://oona-home.ch/'},
    {'slug': 'emaths-world', 'url': 'https://emathsworld.com/'},
    {'slug': 'shin-jewelers', 'url': 'https://shinjewelers.com/'},
    {'slug': 'christmas-loft', 'url': 'https://christmasloft.com/'},
    {'slug': 'design-essentials', 'url': 'https://designessentials.com/'},
    {'slug': 'ichor-bio', 'url': 'https://ichor.bio/'},
    {'slug': 'jacob-alexander', 'url': 'http://jacobalexander.com/'},
    {'slug': 'jb-tools', 'url': 'https://in.jbtools.com/'},
    {'slug': 'shark-leathers', 'url': 'https://sharkleathers.com.au/'},
    {'slug': 'hornsby-beekeeping', 'url': 'https://www.hornsby-beekeeping.com/'},
    {'slug': 'plant-doctor', 'url': 'https://www.plantdoctor.com.au/'},
    {'slug': 'coore', 'url': 'https://www.coore.com.au/'},
    {'slug': 'guitar-templates', 'url': 'https://www.guitartemplates.com.au/'},
    {'slug': 'american-trucks', 'url': 'https://www.americantrucks.com/'},
    {'slug': 'woolf-university', 'url': 'https://woolf.university/'},
    {'slug': 'mirror-media-marketing', 'url': 'https://www.mirrormediamarketing.com/'},
    {'slug': 'dakwala', 'url': 'https://dakwala.co.uk/'},
    {'slug': 'vaisakhhi-haria', 'url': 'https://www.vaishakhiharia.com/'},
    {'slug': 'lynn-milo-pilates', 'url': 'https://www.lynnmilyopilates.com/'},
    {'slug': 'dopple-press', 'url': 'https://www.dopplepress.com/'},
    {'slug': 'salty-donut', 'url': 'https://www.saltydonut.com/'},
    {'slug': 'mane-ethical', 'url': 'https://www.maneethical.com/'},
    {'slug': 'evolve-clothing-gallery', 'url': 'https://www.evolveclothinggallery.com/'},
    {'slug': 'taste-hub', 'url': 'https://tastehub.framer.website'},
    {'slug': 'agensip-styleest', 'url': 'https://agensip-styleest.framer.website'},
    {'slug': 'beauty-products-framer', 'url': 'https://beauty-products.framer.website'},
    {'slug': 'rayna-site', 'url': 'https://rayna-site.framer.website'},
]

def capture_project_screenshot(slug, url):
    """Capture screenshot for a project"""
    project_dir = f'static/assets/projects/{slug}'
    os.makedirs(project_dir, exist_ok=True)
    output_file = f'{project_dir}/screenshot.png'

    print(f'\n📸 Capturing: {slug}')
    print(f'   URL: {url}')
    print(f'   Saving to: {output_file}')

    cmd = [
        'shot-scraper',
        url,
        '--output', output_file,
        '--width', '1280',
        '--height', '1000',
        '--retina',
        '--wait', '2000',
        '--timeout', '60000'
    ]

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=90)
        if result.returncode == 0:
            size = os.path.getsize(output_file) / (1024 * 1024)
            print(f'   ✅ Success ({size:.2f}MB)')
            return True
        else:
            print(f'   ❌ Failed: {result.stderr}')
            return False
    except Exception as e:
        print(f'   ❌ Error: {str(e)}')
        return False

def main():
    total = len(projects)
    successful = 0

    print(f'🚀 Starting to capture {total} project screenshots...')
    print('=' * 60)

    for i, project in enumerate(projects, 1):
        print(f'\n[{i}/{total}]', end='')
        if capture_project_screenshot(project['slug'], project['url']):
            successful += 1

    print('\n' + '=' * 60)
    print(f'\n✨ Done! {successful}/{total} screenshots captured successfully')
    print(f'   Location: static/assets/projects/{{slug}}/screenshot.png')

if __name__ == '__main__':
    main()
