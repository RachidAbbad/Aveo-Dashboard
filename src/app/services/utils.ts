import { Observable, of } from "rxjs";
import { delay } from 'rxjs/operators';


export const simulateLoading = (duration) => {
    type Post = { title: string, content: string };
    const post:Observable<Post> = of( 
      {title: 'Simulating HTTP Requests', 
       content: 'This is off the hook!!'})
      .pipe(delay(duration));
    return post;
}
