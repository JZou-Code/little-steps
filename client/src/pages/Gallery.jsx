import React from 'react';
import classes from '../style/GalleryPage.module.css'
import gallery1 from '../assets/gallery-page/gallery-1.jpg'
import gallery2 from '../assets/gallery-page/gallery-2.jpg'
import gallery3 from '../assets/gallery-page/gallery-3.jpg'
import gallery4 from '../assets/gallery-page/gallery-4.jpg'

/**
 * Gallery component that displays activity showcases
 * Shows different learning activities with images and descriptions
 * Includes drawing, storytelling, alphabet learning, and handcraft sections
 * 
 * @returns {JSX.Element} The gallery page component with activity showcases
 */
const Gallery = () => {
    return (
        <div className={classes.Container}>
            <section className={classes.Section}>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} src={gallery1} alt={'gallery image'}/>
                </div>
                <div className={classes.Description}>
                    <div className={classes.Title}>
                        Drawing
                    </div>
                    <div className={classes.Content}>
                        In our art corner, children are encouraged to explore colors and shapes through drawing and
                        painting. This activity allows them to express their feelings, develop fine motor skills, and
                        enjoy the creative process at their own pace.
                    </div>
                </div>
            </section>

            <section className={classes.Section}>
                <div className={classes.Description}>
                    <div className={classes.Title}>
                        Storytelling
                    </div>
                    <div className={classes.Content}>
                        Storytime is a special moment when children gather to listen to engaging tales. Through stories,
                        they expand their imagination, build listening skills, and develop an early love for language
                        and literature.
                    </div>
                </div>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} src={gallery2} alt={'gallery image'}/>
                </div>
            </section>

            <section className={classes.Section}>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} src={gallery3} alt={'gallery image'}/>
                </div>
                <div className={classes.Description}>
                    <div className={classes.Title}>
                        Learning the Alphabet
                    </div>
                    <div className={classes.Content}>
                        Our alphabet activities introduce children to letters in playful and interactive ways. Singing
                        songs, tracing shapes, and recognizing letters help them build the foundation for early reading
                        and writing.
                    </div>
                </div>
            </section>

            <section className={classes.Section}>
                <div className={classes.Description}>
                    <div className={classes.Title}>
                        Handcraft
                    </div>
                    <div className={classes.Content}>
                        Craft sessions give children the chance to work with different materials like paper, glue, and
                        natural objects. These activities foster creativity, problem-solving, and teamwork, while also
                        strengthening hand–eye coordination.
                    </div>
                </div>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} src={gallery4} alt={'gallery image'}/>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
