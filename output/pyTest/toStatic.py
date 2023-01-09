from bs4 import BeautifulSoup
import os

substitutions = [
('.aspx?', '-'),
('?', '-'),
('=', '-'),
('&', '-'),
(".aspx", ""),
(" ", "%20"),
("https://partners.wgu.edu:443", "")]

def processContent(name):
    with open(file, encoding="utf8") as f:
        soup = BeautifulSoup(f)

        for a in soup.find_all('a', href=True): # find all anchor tags

            href = a['href']

    # bracket this stuff with "is this the href I'm looking for"
            if '/Pages/' in href: 

                for search, replacement in substitutions: # make substitutions
                    href = href.replace(search, replacement)

                href=f"{href}.html" # append .html

                a['href'] = href.lower() # update back to model

    # end if block


        for link in soup.find_all('link', href=True): # find all anchor tags

            href = link['href']

    # bracket this stuff with "is this the href I'm looking for"
            if '/Pages/' in href: 

                for search, replacement in substitutions: # make substitutions
                    href = href.replace(search, replacement)

                href=f"{href}.html" # append .html

                link['href'] = href.lower() # update back to model

    # end if block


        modified = str(soup)

        return modified # stringified

def writeNewFile(name, content):
    print("Writing modified content to " + name + ".new") # don't overwrite, write a new file (or write to a new folder - new filename.html)

    with open(name + ".new", mode='w', encoding='utf-8') as of:
        of.write(content)


for file in os.listdir("./"): # list all files in current folder
    try:
        if file.endswith(".html"): # only process .html (maybe add .aspx?)
            print("Now processing " + str(file))

            modified = processContent(file)

            # print(modified)

            writeNewFile(file, modified)
    except Exception as hell:
        print("No files found here!")
        raise hell
        
    