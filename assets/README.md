# Assets Directory Guide 📁

Place your personal files, resume, certificate documents, and project screenshots in these folders.

## Folder Organization

| Folder | What to put here | Suggested Filenames |
| :--- | :--- | :--- |
| `assets/images/` | Your profile picture, avatar, or headshot | `meet.png`, `profile.jpg` |
| `assets/resume/` | Your latest CV / Resume PDF | `MJ_Resume.pdf` |
| `assets/certificates/` | Certificate photos, scans, or screenshots | `certificate-ibm.jpg`, `certificate-python.jpg`, `certificate-ml.jpg` |
| `assets/projects/` | Screenshots or mockup photos for your projects | `mechmind.jpg`, `life-pattern.jpg`, `campus-go.jpg`, `ai-summarizer.jpg`, `iris-classification.jpg` |

---

## How to Link Files in Your Portfolio

Open `js/data.js` to link your uploaded files:
- **Profile Photo**: Set `profileImage: "assets/images/meet.png"`
- **Resume**: Set `resume: "assets/resume/MJ_Resume.pdf"`
- **Certificates**: In `certificates: [...]`, set `image: "assets/certificates/certificate-ibm.jpg"`
- **Projects**: In `projects: [...]`, set `image: "assets/projects/mechmind.jpg"`

> **Note:** If an image is missing or not yet uploaded, the portfolio will automatically display a sleek, modern tech illustration placeholder so your website always looks complete and professional!
