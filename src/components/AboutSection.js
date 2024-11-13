import { FaAngleRight } from 'react-icons/fa';

const AboutSection = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 mt-2">
            <h2 className="text-4xl font-bold mb-4 text-left">About me</h2>
            <p className="mb-8 text-left">
                My first name is pronounced as "Shi-ao-ya."
                I am currently a third-year Computer Science student.
                I enjoy applying strategies to solve complex problems with creativity and innovation.
                Outside of school and work, I like camping, cycling, snowboarding, and video games.
            </p>

            <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Here are some technologies I have been working with:</h3>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        iOS in Swift
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        Android in Kotlin
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        React & Angular
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        JavaScript ES6+
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        Python & Jupyter Notebook
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        Java
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        C# & .NET
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        C & C++
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        Firebase
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        MongoDB
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        SQL
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        AWS & Azure & IBM Cloud
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAngleRight color="#00C2D1" />
                        Git
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AboutSection;
