using System;
using System.Text.Json;
using System.Runtime.InteropServices.JavaScript;
using Octostache;


public class Program
{
    // entry point is required by the compiler
    public static void Main() { }
}

public record Variable(string Name, string Value);
public record Result(string? Output, string? Error);

public partial class OctostacheWrapper
{
    static JsonSerializerOptions Options = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    [JSExport]
    public static string Evaluate(string? input, string variables)
    {
        var dict = JsonSerializer.Deserialize<Variable[]>(variables, Options);

        var result = Evaluate(input, dict);

        return JsonSerializer.Serialize(result, Options);
    }

    static Result Evaluate(string input, Variable[] variables)
    {
        try 
        {
            var dict = new VariableDictionary();
            foreach (var (name, value) in variables)
            {
                dict.Set(name, value);
            }

            var output = dict.Evaluate(input, out var error);
            
            return new Result(output, error);
        } 
        catch (Exception ex) 
        {
            return new Result("", ex.ToString());
        }
    }
}

