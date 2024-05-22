import json

def prep_line(line):
    return line.strip().replace("\n", "")

def generate_article():
    title = input("Enter the title of the article: ")
    article = {
        "title": title,
        "body": []
    }
    print("Enter each paragraph of the article. Enter ':s' to finish.")
    while True:
        type = input("T for text, I for image, :s to close:")
        if ":s" in type:
            break
        if "t" in type.lower():
            text = input("Enter the paragraph: ")
            article["body"].append({"type": "text", "content": prep_line(text)})
        elif "i" in type.lower():
            image = input("Enter the image URL: ")
            caption = input("Enter the caption: ")
            article["body"].append({"type": "image", "link": prep_line(image), "caption": prep_line(caption)})

    save_name = input("Enter the name of the file to save: ").replace(" ", "_").lower()
    with open(f"{save_name}.json", "w") as f:
        json.dump(article, f)
        print(f"Article saved as {save_name}.json")

if __name__ == "__main__":
    generate_article()
