import {Image,Button, Anchor} from '@mantine/core';

export default function Courses() {  
  return (
    <>
     <div className="coverpage">
        <div className="thumbnail">
           <Image
          src="https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg"
          alt="Running challenge"
          height={500}
          radius={16}
           />
        </div>
        <div className="description">
                <div className="title">
                     <h1>Courses</h1>
                </div>
                <div className="content">
                    <div>
                      <p>Welcome to our course library, where learning meets opportunity. Our
                        diverse range of courses covers everything from technology and business to creative
                        arts and personal development. Each program is created by industry experts and 
                        designed to deliver practical, job-ready skills you can apply immediately. 
                        Learn at your own pace with lifetime access to course materials, downloadable 
                        resources. Find the course that matches your goals and take the first step 
                        toward mastering something new.
                      </p>
                      <Anchor href='/courses/course'>
                      <Button mt="sm" size="md" radius="md" mb="xl">Go to Courses</Button>   
                      </Anchor>      
                    </div>
                 </div>
            </div>
        </div>

      <style>{`
       .coverpage{
           display: flex; 
           flex-direction: column;
           width: 100%;
           height: fit-content;
           background-color: rgb(237, 239, 237);
           padding: 8px;
        }
        .thumbnail{
           width: 100%;
           height: auto;
           border-radius: 16px;
           background-size: cover;
         }   

        .description{
           display: flex;
           flex-direction: row;
           width: 100%;
           gap: 16px;
        }
        .title{
           flex: 0 0 15%;
           padding: 8px;
           text-align: center;
        }
        
        .content{
           flex: 1;
        }
        .content p{
            margin: 8px;
            text-align: justify;
        }
        .content div{
            padding: 8px;
        }
         
        @media (max-width: 768px) {
          .description {
            flex-direction: column;
          }
          .title {
            flex: 1;
          }
        }

        @media (max-width: 480px) {
          .coverpage {
            padding: 12px;
          }
          .title h1 {
            font-size: 24px;
          }
          .content p {
            font-size: 14px;
          }
        }
      `}</style>
     </>
  )

}
