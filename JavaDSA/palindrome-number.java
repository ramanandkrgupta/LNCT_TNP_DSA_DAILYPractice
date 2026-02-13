// https://leetcode.com/problems/palindrome-number/

class Solution {
    public boolean isPalindrome(int x) {


        // if(x<0){
        //     return false;

        // }
        if(x<0||(x%10==0 && x!=0)){
            return false;
        }
        // if(x<10){
        //     return true;
        // }


        int reversed = 0 ;
        while(x>reversed){
            int digit = x%10;
            reversed =reversed*10 + digit;
            x=x/10;



        }
        // if(reversed == x || reversed/10 == x){
        //     return true;
        // }
        return (reversed == x || reversed/10 == x);

    }
}