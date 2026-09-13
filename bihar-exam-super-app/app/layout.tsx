import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata={title:'BiharExam — Bihar Exam Super App',description:'Bihar exams, notes, MCQ, mock tests, jobs and results'};
export default function RootLayout({children}:{children:React.ReactNode}){return <><Header/>{children}<Footer/></>}
