from bs4 import BeautifulSoup
import os

substitutions = [
# (".aspx", ""),
# ('?', '-'),
# ('=', '-'),
# ('&', '-'),
# (" ", "-"),
("%20", "-")
# ("https://partners.wgu.edu:443", "")
#(".css.html", ".css")
]

def processContent(name):
    with open(file, encoding="utf8") as f:
        soup = BeautifulSoup(f)

        for a in soup.find_all('a', href=True): # find all anchor tags

            href = a['href']

    # bracket this stuff with "is this the href I'm looking for"
            if '/pages/' in href: 

                for search, replacement in substitutions: # make substitutions
                    href = href.replace(search, replacement)

                # href=f"{href}.html" # append .html

                a['href'] = href.lower() # update back to model

    # end if block


        for link in soup.find_all('link', href=True): # find all anchor tags

            href = link['href']

    # bracket this stuff with "is this the href I'm looking for"
            if '/pages/' in href: 

                for search, replacement in substitutions: # make substitutions
                    href = href.replace(search, replacement)

                # href=f"{href}.html" # append .html

                link['href'] = href.lower() # update back to model

    # end if block


        for ng in soup.find_all('link', href=True): # find all anchor tags

            href = ng['href']

    # bracket this stuff with "is this the href I'm looking for"
            if '/pages/' in href: 

                for search, replacement in substitutions: # make substitutions
                    href = href.replace(search, replacement)

                # href=f"{href}.html" # append .html

                ng['href'] = href.lower() # update back to model

    # end if block


        modified = str(soup)

        return modified # stringified

def writeNewFile(name, content):

    substitutions = [   
    ("%20", "-")]

    for search, replacement in substitutions: # make substitutions
        name = name.replace(search, replacement)
    
    print("Writing modified content to " + name) # don't overwrite, write a new file (or write to a new folder - new filename.html)
    # print("Writing modified content to " + name + ".new") # don't overwrite, write a new file (or write to a new folder - new filename.html)

    with open(name, mode='w+', encoding='utf-8') as of:
    # with open(name + ".new", mode='w', encoding='utf-8') as of:
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
        
    