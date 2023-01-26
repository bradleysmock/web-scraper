from bs4 import BeautifulSoup
import os

substitutions = [
(".aspx", ""),
('?', '-'),
('=', '-'),
('&', '-'),
(" ", "-"),
("%20", "-"),
("https://partners.wgu.edu/PublishingImages", "/images"),
("image/female", "images/female"),
("image/male", "images/male"),
("image/owl", "images/owl")]

def processContent(name):
    with open(file, encoding="utf8") as f:
        soup = BeautifulSoup(f)

        for img in soup.find_all('img', src=True): # find all anchor tags

            src = img['src']

    # bracket this stuff with "is this the href I'm looking for"
            if '/PublishingImages/' in src: 

                for search, replacement in substitutions: # make substitutions
                    src = src.replace(search, replacement)

                img['src'] = src.lower() # update back to model

    # end if block

    # bracket this stuff with "is this the href I'm looking for"
            if '/image/' in src: 

                for search, replacement in substitutions: # make substitutions
                    src = src.replace(search, replacement)

                img['src'] = src.lower() # update back to model

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
        
    