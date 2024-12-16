#include <iostream>
#include <vector>
#include <algorithm>

bool isPrime(int num)
{
    if (num <= 1)
        return false;
    for (int i = 2; i * i <= num; i++)
    {
        if (num % i == 0)
            return false;
    }
    return true;
}

std::vector<int> sortArray(std::vector<int> arr)
{
    std::vector<int> primes;
    std::vector<int> nonPrimes;

    // Separate primes and non-primes
    for (int num : arr)
    {
        if (isPrime(num))
        {
            primes.push_back(num);
        }
        else
        {
            nonPrimes.push_back(num);
        }
    }

    // Sort primes in descending order
    std::sort(primes.begin(), primes.end(), std::greater<int>());

    // Sort non-primes in descending order
    std::sort(nonPrimes.begin(), nonPrimes.end(), std::greater<int>());

    // Combine primes and non-primes, with non-primes first
    primes.insert(primes.end(), nonPrimes.begin(), nonPrimes.end());
    return primes;
}

int main()
{
    std::vector<int> arr1 = {1, 6, 4, 13, 9, 3};
    std::vector<int> result = sortArray(arr1);

    std::cout << "Sorted array: ";
    for (int num : result)
    {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    std::vector<int> arr2 = {5, 1, 8, 11, 2};
    result = sortArray(arr2);

    std::cout << "Sorted array: ";
    for (int num : result)
    {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}